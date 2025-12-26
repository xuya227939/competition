import { useEffect, useRef, useState, useMemo } from 'react';
import { Renderer, Program, Mesh, Triangle, Color } from 'ogl';

interface ThreadsProps {
    color?: [number, number, number];
    amplitude?: number;
    distance?: number;
    enableMouseInteraction?: boolean;
    quality?: 'low' | 'medium' | 'high';
}

// 🔧 设备性能检测结果缓存
let cachedPerformanceLevel: 'low' | 'medium' | 'high' | null = null;

// 🔧 检测设备性能等级
const detectPerformanceLevel = (): 'low' | 'medium' | 'high' => {
    if (cachedPerformanceLevel !== null) return cachedPerformanceLevel;

    try {
        // 检测是否为移动设备
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl');

        if (!gl) {
            cachedPerformanceLevel = 'low';
            return 'low';
        }

        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
            const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
            const lowerRenderer = renderer.toLowerCase();

            // 检测高性能 GPU
            const isHighPerformance =
                lowerRenderer.includes('nvidia') ||
                lowerRenderer.includes('radeon') ||
                lowerRenderer.includes('amd') ||
                lowerRenderer.includes('geforce') ||
                lowerRenderer.includes('rtx') ||
                lowerRenderer.includes('gtx') ||
                lowerRenderer.includes('apple m1') ||
                lowerRenderer.includes('apple m2') ||
                lowerRenderer.includes('apple m3');

            // 检测低性能 GPU（集成显卡）
            const isLowPerformance =
                lowerRenderer.includes('intel graphics') ||
                lowerRenderer.includes('intel hd') ||
                lowerRenderer.includes('intel uhd') ||
                lowerRenderer.includes('intel iris') ||
                lowerRenderer.includes('mali') ||
                lowerRenderer.includes('adreno') ||
                lowerRenderer.includes('powervr') ||
                lowerRenderer.includes('swiftshader') ||
                lowerRenderer.includes('llvmpipe');

            if (isHighPerformance && !isMobile) {
                cachedPerformanceLevel = 'high';
            } else if (isLowPerformance || isMobile) {
                cachedPerformanceLevel = 'low';
            } else {
                cachedPerformanceLevel = 'medium';
            }
        } else {
            // 无法获取 GPU 信息，根据设备类型判断
            cachedPerformanceLevel = isMobile ? 'low' : 'medium';
        }
    } catch (e) {
        cachedPerformanceLevel = 'low';
    }

    console.log(`[Threads] Detected performance level: ${cachedPerformanceLevel}`);
    return cachedPerformanceLevel;
};

const vertexShader = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

// 根据性能等级生成不同的着色器
const createFragmentShader = (lineCount: number) => `
precision highp float;

uniform float iTime;
uniform vec3 iResolution;
uniform vec3 uColor;
uniform float uAmplitude;
uniform float uDistance;
uniform vec2 uMouse;

#define PI 3.1415926538

const int u_line_count = ${lineCount};
const float u_line_width = 7.0;
const float u_line_blur = 10.0;`;

const fragmentShaderBody = `
float Perlin2D(vec2 P) {
    vec2 Pi = floor(P);
    vec4 Pf_Pfmin1 = P.xyxy - vec4(Pi, Pi + 1.0);
    vec4 Pt = vec4(Pi.xy, Pi.xy + 1.0);
    Pt = Pt - floor(Pt * (1.0 / 71.0)) * 71.0;
    Pt += vec2(26.0, 161.0).xyxy;
    Pt *= Pt;
    Pt = Pt.xzxz * Pt.yyww;
    vec4 hash_x = fract(Pt * (1.0 / 951.135664));
    vec4 hash_y = fract(Pt * (1.0 / 642.949883));
    vec4 grad_x = hash_x - 0.49999;
    vec4 grad_y = hash_y - 0.49999;
    vec4 grad_results = inversesqrt(grad_x * grad_x + grad_y * grad_y)
        * (grad_x * Pf_Pfmin1.xzxz + grad_y * Pf_Pfmin1.yyww);
    grad_results *= 1.4142135623730950;
    vec2 blend = Pf_Pfmin1.xy * Pf_Pfmin1.xy * Pf_Pfmin1.xy
               * (Pf_Pfmin1.xy * (Pf_Pfmin1.xy * 6.0 - 15.0) + 10.0);
    vec4 blend2 = vec4(blend, vec2(1.0 - blend));
    return dot(grad_results, blend2.zxzx * blend2.wwyy);
}

float pixel(float count, vec2 resolution) {
    return (1.0 / max(resolution.x, resolution.y)) * count;
}

float lineFn(vec2 st, float width, float perc, float offset, vec2 mouse, float time, float amplitude, float distance) {
    float split_offset = (perc * 0.4);
    float split_point = 0.1 + split_offset;

    float amplitude_normal = smoothstep(split_point, 0.7, st.x);
    float amplitude_strength = 0.5;
    float finalAmplitude = amplitude_normal * amplitude_strength
                           * amplitude * (1.0 + (mouse.y - 0.5) * 0.2);

    float time_scaled = time / 10.0 + (mouse.x - 0.5) * 1.0;
    float blur = smoothstep(split_point, split_point + 0.05, st.x) * perc;

    float xnoise = mix(
        Perlin2D(vec2(time_scaled, st.x + perc) * 2.5),
        Perlin2D(vec2(time_scaled, st.x + time_scaled) * 3.5) / 1.5,
        st.x * 0.3
    );

    float y = 0.5 + (perc - 0.5) * distance + xnoise / 2.0 * finalAmplitude;

    float line_start = smoothstep(
        y + (width / 2.0) + (u_line_blur * pixel(1.0, iResolution.xy) * blur),
        y,
        st.y
    );

    float line_end = smoothstep(
        y,
        y - (width / 2.0) - (u_line_blur * pixel(1.0, iResolution.xy) * blur),
        st.y
    );

    return clamp(
        (line_start - line_end) * (1.0 - smoothstep(0.0, 1.0, pow(perc, 0.3))),
        0.0,
        1.0
    );
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord / iResolution.xy;

    float line_strength = 1.0;
    for (int i = 0; i < u_line_count; i++) {
        float p = float(i) / float(u_line_count);
        line_strength *= (1.0 - lineFn(
            uv,
            u_line_width * pixel(1.0, iResolution.xy) * (1.0 - p),
            p,
            (PI * 1.0) * p,
            uMouse,
            iTime,
            uAmplitude,
            uDistance
        ));
    }

    float colorVal = 1.0 - line_strength;
    fragColor = vec4(uColor * colorVal, colorVal);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
`;

// 生成完整的 fragment shader
const getFragmentShader = (lineCount: number) => createFragmentShader(lineCount) + fragmentShaderBody;

const Threads: React.FC<ThreadsProps> = ({ color = [1, 1, 1], amplitude = 1, distance = 0, enableMouseInteraction = false, quality, ...rest }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const animationFrameId = useRef<number>();
    const lastFrameTime = useRef<number>(0);

    // 🔧 在组件挂载时立即检测性能等级
    const performanceLevel = useMemo(() => {
        if (typeof window === 'undefined') return 'medium';
        return quality || detectPerformanceLevel();
    }, [quality]);

    // 🔧 根据性能等级决定参数
    const renderConfig = useMemo(() => {
        switch (performanceLevel) {
            case 'low':
                return {
                    scale: 0.35,        // 大幅降采样
                    lineCount: 15,      // 减少线条数量
                    targetFPS: 24       // 限制帧率
                };
            case 'medium':
                return {
                    scale: 0.6,
                    lineCount: 25,
                    targetFPS: 30
                };
            case 'high':
            default:
                return {
                    scale: 1.0,
                    lineCount: 40,
                    targetFPS: 60
                };
        }
    }, [performanceLevel]);

    useEffect(() => {
        if (!containerRef.current) return;
        const container = containerRef.current;

        const renderer = new Renderer({ alpha: true });
        const gl = renderer.gl;
        gl.clearColor(0, 0, 0, 0);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        container.appendChild(gl.canvas);

        const geometry = new Triangle(gl);
        
        // 🔧 根据性能等级生成对应的着色器
        const fragmentShader = getFragmentShader(renderConfig.lineCount);
        
        const program = new Program(gl, {
            vertex: vertexShader,
            fragment: fragmentShader,
            uniforms: {
                iTime: { value: 0 },
                iResolution: {
                    value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)
                },
                uColor: { value: new Color(...color) },
                uAmplitude: { value: amplitude },
                uDistance: { value: distance },
                uMouse: { value: new Float32Array([0.5, 0.5]) }
            }
        });

        const mesh = new Mesh(gl, { geometry, program });

        function resize() {
            const { clientWidth, clientHeight } = container;

            // 🔧 核心优化：降采样渲染
            const renderWidth = Math.max(1, Math.floor(clientWidth * renderConfig.scale));
            const renderHeight = Math.max(1, Math.floor(clientHeight * renderConfig.scale));

            // 低分辨率渲染
            renderer.setSize(renderWidth, renderHeight);

            // 但设置 canvas 的实际显示尺寸为全分辨率
            if (gl.canvas) {
                gl.canvas.style.width = `${clientWidth}px`;
                gl.canvas.style.height = `${clientHeight}px`;
            }

            // uniform 使用实际渲染分辨率
            program.uniforms.iResolution.value.r = renderWidth;
            program.uniforms.iResolution.value.g = renderHeight;
            program.uniforms.iResolution.value.b = renderWidth / renderHeight;
        }

        window.addEventListener('resize', resize);
        resize();

        let currentMouse = [0.5, 0.5];
        let targetMouse = [0.5, 0.5];

        function handleMouseMove(e: MouseEvent) {
            const rect = container.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = 1.0 - (e.clientY - rect.top) / rect.height;
            targetMouse = [x, y];
        }
        function handleMouseLeave() {
            targetMouse = [0.5, 0.5];
        }
        
        // 🔧 低性能设备禁用鼠标交互以减少计算
        const shouldEnableMouseInteraction = enableMouseInteraction && performanceLevel !== 'low';
        
        if (shouldEnableMouseInteraction) {
            container.addEventListener('mousemove', handleMouseMove);
            container.addEventListener('mouseleave', handleMouseLeave);
        }

        // 🔧 帧率限制
        const frameInterval = 1000 / renderConfig.targetFPS;

        function update(t: number) {
            // 帧率限制
            const elapsed = t - lastFrameTime.current;
            if (elapsed < frameInterval) {
                animationFrameId.current = requestAnimationFrame(update);
                return;
            }
            lastFrameTime.current = t - (elapsed % frameInterval);

            if (shouldEnableMouseInteraction) {
                const smoothing = 0.05;
                currentMouse[0] += smoothing * (targetMouse[0] - currentMouse[0]);
                currentMouse[1] += smoothing * (targetMouse[1] - currentMouse[1]);
                program.uniforms.uMouse.value[0] = currentMouse[0];
                program.uniforms.uMouse.value[1] = currentMouse[1];
            } else {
                program.uniforms.uMouse.value[0] = 0.5;
                program.uniforms.uMouse.value[1] = 0.5;
            }
            program.uniforms.iTime.value = t * 0.001;

            renderer.render({ scene: mesh });
            animationFrameId.current = requestAnimationFrame(update);
        }
        animationFrameId.current = requestAnimationFrame(update);

        return () => {
            if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
            window.removeEventListener('resize', resize);

            if (shouldEnableMouseInteraction) {
                container.removeEventListener('mousemove', handleMouseMove);
                container.removeEventListener('mouseleave', handleMouseLeave);
            }
            if (container.contains(gl.canvas)) container.removeChild(gl.canvas);
            gl.getExtension('WEBGL_lose_context')?.loseContext();
        };
    }, [color, amplitude, distance, enableMouseInteraction, performanceLevel, renderConfig]);

    return <div ref={containerRef} className="relative h-full w-full" {...rest} />;
};

export default Threads;
