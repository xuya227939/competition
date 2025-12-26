import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, RotateCcw, Zap, Shield, Globe, FileText, Package, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PageSEO } from '@/components/seo/pageSEO';
import MainLayout from '@/components/layouts/mainLayout';
import { loadFileAsArrayBuffer } from '@/utils';
import intl from 'react-intl-universal';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader.js';
import { ThreeMFLoader } from 'three/examples/jsm/loaders/3MFLoader.js';
import JSZip from 'jszip';
import { useI18nStore } from '@/store/i18nStore';

export function Page() {
    const { lang } = useI18nStore();
    return (
        <>
            <PageSEO pageKey="fileConverter" />
            <FileConverter />
        </>
    );
}

function FileConverter() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedInputFormat, setSelectedInputFormat] = useState('gltf');
    const [selectedOutputFormat, setSelectedOutputFormat] = useState('glb');
    const [isConverting, setIsConverting] = useState(false);
    const [conversionProgress, setConversionProgress] = useState(0);
    const [originalFile, setOriginalFile] = useState<File | null>(null);
    const [convertedFile, setConvertedFile] = useState<Blob | null>(null);
    const [fileInfo, setFileInfo] = useState<{
        name: string;
        size: number;
        type: string;
    } | null>(null);
    const [error, setError] = useState<string | null>(null);

    // 支持的格式选项
    const formatOptions = [
        { value: 'gltf', label: 'GLTF', description: 'JSON-based 3D format', extensions: ['.gltf'] },
        { value: 'glb', label: 'GLB', description: 'Binary GLTF format', extensions: ['.glb'] },
        { value: 'fbx', label: 'FBX', description: 'Autodesk FBX format', extensions: ['.fbx'] },
        { value: 'obj', label: 'OBJ', description: 'Wavefront OBJ format', extensions: ['.obj'] },
        { value: 'dae', label: 'DAE', description: 'Collada DAE format', extensions: ['.dae'] },
        { value: 'stl', label: 'STL', description: 'STereoLithography format', extensions: ['.stl'] },
        { value: 'ply', label: 'PLY', description: 'Polygon File Format', extensions: ['.ply'] },
        { value: '3mf', label: '3MF', description: '3D Manufacturing Format', extensions: ['.3mf'] }
    ];

    // 获取文件扩展名
    const getFileExtension = (filename: string) => {
        return filename.toLowerCase().split('.').pop() || '';
    };

    // 检测文件格式
    const detectFileFormat = (filename: string) => {
        const ext = getFileExtension(filename);
        const format = formatOptions.find(f => f.extensions.includes(`.${ext}`));
        return format?.value || 'unknown';
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setError(null);
        setOriginalFile(file);
        setFileInfo({
            name: file.name,
            size: file.size,
            type: file.type || 'application/octet-stream'
        });

        // 自动检测文件格式
        const detectedFormat = detectFileFormat(file.name);
        if (detectedFormat !== 'unknown') {
            setSelectedInputFormat(detectedFormat);
        }
    };

    const loadModel = async (arrayBuffer: ArrayBuffer, format: string) => {
        return new Promise((resolve, reject) => {
            let loader: any;
            let scene: THREE.Group;

            switch (format) {
                case 'gltf':
                case 'glb':
                    loader = new GLTFLoader();
                    loader.parse(
                        arrayBuffer,
                        '',
                        (gltf: any) => {
                            resolve(gltf.scene);
                        },
                        reject
                    );
                    break;

                case 'fbx':
                    loader = new FBXLoader();
                    scene = loader.parse(arrayBuffer, '');
                    resolve(scene);
                    break;

                case 'obj':
                    loader = new OBJLoader();
                    scene = loader.parse(new TextDecoder().decode(arrayBuffer));
                    resolve(scene);
                    break;

                case 'dae':
                    loader = new ColladaLoader();
                    const collada = loader.parse(new TextDecoder().decode(arrayBuffer));
                    resolve(collada.scene);
                    break;

                case 'stl':
                    loader = new STLLoader();
                    const geometry = loader.parse(arrayBuffer);
                    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
                    scene = new THREE.Group();
                    scene.add(new THREE.Mesh(geometry, material));
                    resolve(scene);
                    break;

                case 'ply':
                    loader = new PLYLoader();
                    const plyGeometry = loader.parse(arrayBuffer);
                    const plyMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
                    scene = new THREE.Group();
                    scene.add(new THREE.Mesh(plyGeometry, plyMaterial));
                    resolve(scene);
                    break;

                case '3mf':
                    loader = new ThreeMFLoader();
                    loader.parse(
                        arrayBuffer,
                        '',
                        (result: any) => {
                            resolve(result.scene);
                        },
                        reject
                    );
                    break;

                default:
                    reject(new Error(`不支持的输入格式: ${format}`));
            }
        });
    };

    // OBJ 导出器
    const exportToOBJ = (scene: THREE.Group): string => {
        let objString = '# OBJ file exported from 3D Model Converter\n';
        let mtlString = '# MTL file exported from 3D Model Converter\n';

        let vertexOffset = 1;
        let materialIndex = 0;
        const materials: { [key: string]: number } = {};

        scene.traverse(child => {
            if (child instanceof THREE.Mesh && child.geometry) {
                const geometry = child.geometry;
                const material = child.material as THREE.Material;

                // 处理材质
                let materialName = `material_${materialIndex}`;
                if (material.name) {
                    materialName = material.name;
                }

                if (!materials[materialName]) {
                    materials[materialName] = materialIndex;
                    materialIndex++;

                    // 添加到 MTL 文件
                    mtlString += `newmtl ${materialName}\n`;
                    if (material instanceof THREE.MeshStandardMaterial) {
                        const color = material.color;
                        mtlString += `Kd ${color.r} ${color.g} ${color.b}\n`;
                        if (material.map) {
                            mtlString += `map_Kd ${material.name}_texture.png\n`;
                        }
                    }
                    mtlString += '\n';
                }

                // 处理顶点
                const positions = geometry.attributes.position;
                const normals = geometry.attributes.normal;
                const uvs = geometry.attributes.uv;

                if (positions) {
                    for (let i = 0; i < positions.count; i++) {
                        const x = positions.getX(i);
                        const y = positions.getY(i);
                        const z = positions.getZ(i);
                        objString += `v ${x} ${y} ${z}\n`;
                    }
                }

                if (normals) {
                    for (let i = 0; i < normals.count; i++) {
                        const x = normals.getX(i);
                        const y = normals.getY(i);
                        const z = normals.getZ(i);
                        objString += `vn ${x} ${y} ${z}\n`;
                    }
                }

                if (uvs) {
                    for (let i = 0; i < uvs.count; i++) {
                        const u = uvs.getX(i);
                        const v = uvs.getY(i);
                        objString += `vt ${u} ${v}\n`;
                    }
                }

                // 处理面
                objString += `g ${child.name || 'mesh'}\n`;
                objString += `usemtl ${materialName}\n`;

                const indices = geometry.index;
                if (indices) {
                    for (let i = 0; i < indices.count; i += 3) {
                        const a = indices.getX(i) + vertexOffset;
                        const b = indices.getX(i + 1) + vertexOffset;
                        const c = indices.getX(i + 2) + vertexOffset;

                        if (normals && uvs) {
                            objString += `f ${a}/${a}/${a} ${b}/${b}/${b} ${c}/${c}/${c}\n`;
                        } else if (normals) {
                            objString += `f ${a}//${a} ${b}//${b} ${c}//${c}\n`;
                        } else if (uvs) {
                            objString += `f ${a}/${a} ${b}/${b} ${c}/${c}\n`;
                        } else {
                            objString += `f ${a} ${b} ${c}\n`;
                        }
                    }
                } else {
                    // 没有索引，直接使用顶点
                    for (let i = 0; i < positions.count; i += 3) {
                        const a = i + vertexOffset;
                        const b = i + 1 + vertexOffset;
                        const c = i + 2 + vertexOffset;
                        objString += `f ${a} ${b} ${c}\n`;
                    }
                }

                vertexOffset += positions.count;
            }
        });

        return objString;
    };

    // STL 导出器
    const exportToSTL = (scene: THREE.Group): ArrayBuffer => {
        const triangles: number[] = [];

        scene.traverse(child => {
            if (child instanceof THREE.Mesh && child.geometry) {
                const geometry = child.geometry;
                const matrix = child.matrixWorld;

                const positions = geometry.attributes.position;
                const indices = geometry.index;

                if (indices) {
                    for (let i = 0; i < indices.count; i += 3) {
                        const a = indices.getX(i);
                        const b = indices.getX(i + 1);
                        const c = indices.getX(i + 2);

                        const v1 = new THREE.Vector3(positions.getX(a), positions.getY(a), positions.getZ(a));
                        const v2 = new THREE.Vector3(positions.getX(b), positions.getY(b), positions.getZ(b));
                        const v3 = new THREE.Vector3(positions.getX(c), positions.getY(c), positions.getZ(c));

                        v1.applyMatrix4(matrix);
                        v2.applyMatrix4(matrix);
                        v3.applyMatrix4(matrix);

                        // 计算法向量
                        const normal = new THREE.Vector3();
                        normal.crossVectors(v2.clone().sub(v1), v3.clone().sub(v1)).normalize();

                        // 添加三角形数据
                        triangles.push(normal.x, normal.y, normal.z);
                        triangles.push(v1.x, v1.y, v1.z);
                        triangles.push(v2.x, v2.y, v2.z);
                        triangles.push(v3.x, v3.y, v3.z);
                        triangles.push(0, 0, 0); // 属性字节计数
                    }
                }
            }
        });

        // 创建二进制 STL 文件
        const buffer = new ArrayBuffer(80 + 4 + triangles.length * 4);
        const view = new DataView(buffer);

        // STL 头部 (80 字节)
        for (let i = 0; i < 80; i++) {
            view.setUint8(i, 0);
        }

        // 三角形数量
        view.setUint32(80, triangles.length / 15, true);

        // 三角形数据
        for (let i = 0; i < triangles.length; i++) {
            view.setFloat32(84 + i * 4, triangles[i], true);
        }

        return buffer;
    };

    // 修复 3MF 导出，确保几何体数据正确
    const exportTo3MF = async (scene: THREE.Group): Promise<ArrayBuffer> => {
        const zip = new JSZip();

        // 创建 3MF 模型数据
        const modelData = await extractModelData(scene);

        // 检查是否有有效的几何体数据
        if (modelData.meshes.length === 0) {
            throw new Error('没有找到有效的几何体数据');
        }

        // 验证每个网格的数据
        modelData.meshes.forEach((mesh: any, index: number) => {
            if (mesh.vertices.length === 0) {
                throw new Error(`网格 ${index} 没有顶点数据`);
            }
            if (mesh.triangles.length === 0) {
                throw new Error(`网格 ${index} 没有三角形数据`);
            }
        });

        // 生成 3MF XML 内容
        const xmlContent = generate3MFXML(modelData);

        // 添加必要的文件到 ZIP
        zip.file('[Content_Types].xml', generateContentTypesXML());
        zip.file('_rels/.rels', generateRelsXML());
        zip.file('3D/3dmodel.model', xmlContent);

        // 如果有材质，添加材质文件
        if (modelData.materials.length > 0) {
            zip.file('3D/3dmodel.materials', generateMaterialsXML(modelData.materials));
        }

        // 生成 ZIP 文件
        const zipBuffer = await zip.generateAsync({
            type: 'arraybuffer',
            compression: 'DEFLATE',
            compressionOptions: {
                level: 6
            }
        });

        return zipBuffer;
    };

    // 改进的几何体数据提取
    const extractModelData = async (scene: THREE.Group): Promise<any> => {
        const modelData: any = {
            meshes: [],
            materials: [],
            textures: []
        };

        let meshIndex = 0;
        let materialIndex = 0;

        // 收集所有网格数据
        const meshData: any[] = [];

        scene.traverse((child: any) => {
            if (child instanceof THREE.Mesh && child.geometry) {
                const geometry = child.geometry;
                const material = child.material as THREE.Material;

                // 确保几何体有位置数据
                if (!geometry.attributes.position) {
                    console.warn('几何体缺少位置数据，跳过');
                    return;
                }

                // 计算几何体边界框，确保有有效数据
                geometry.computeBoundingBox();
                const bbox = geometry.boundingBox;
                if (!bbox || bbox.isEmpty()) {
                    console.warn('几何体边界框为空，跳过');
                    return;
                }

                // 处理几何体
                const positions: any = geometry.attributes.position;
                const normals = geometry.attributes.normal;
                const uvs = geometry.attributes.uv;
                const colors = geometry.attributes.color;
                const indices = geometry.index;

                const mesh: any = {
                    id: meshIndex++,
                    vertices: [],
                    normals: [],
                    uvs: [],
                    colors: [],
                    triangles: [],
                    material: materialIndex++,
                    materialRef: material
                };

                // 提取顶点数据
                for (let i = 0; i < positions.count; i++) {
                    mesh.vertices.push(positions.getX(i), positions.getY(i), positions.getZ(i));
                }

                // 提取法向量（如果有）
                if (normals) {
                    for (let i = 0; i < normals.count; i++) {
                        mesh.normals.push(normals.getX(i), normals.getY(i), normals.getZ(i));
                    }
                }

                // 提取 UV 坐标（如果有）
                if (uvs) {
                    for (let i = 0; i < uvs.count; i++) {
                        mesh.uvs.push(uvs.getX(i), uvs.getY(i));
                    }
                }

                // 提取顶点颜色（如果有）
                if (colors) {
                    for (let i = 0; i < colors.count; i++) {
                        mesh.colors.push(colors.getX(i), colors.getY(i), colors.getZ(i));
                    }
                }

                // 提取三角形索引
                if (indices) {
                    for (let i = 0; i < indices.count; i += 3) {
                        mesh.triangles.push(indices.getX(i), indices.getX(i + 1), indices.getX(i + 2));
                    }
                } else {
                    // 如果没有索引，创建三角形索引
                    for (let i = 0; i < positions.count; i += 3) {
                        mesh.triangles.push(i, i + 1, i + 2);
                    }
                }

                // 验证三角形数据
                if (mesh.triangles.length === 0) {
                    console.warn('网格没有三角形数据，跳过');
                    return;
                }

                // 检查三角形索引是否有效
                const maxIndex = Math.max(...mesh.triangles);
                if (maxIndex >= positions.count) {
                    console.warn('三角形索引超出顶点范围，跳过');
                    return;
                }

                meshData.push(mesh);
            }
        });

        // 处理材质数据
        for (let i = 0; i < meshData.length; i++) {
            const mesh = meshData[i];
            const materialData = await extractMaterialData(mesh.materialRef, mesh.material);

            modelData.meshes.push(mesh);
            modelData.materials.push(materialData);
        }

        return modelData;
    };

    // 改进的 3MF XML 生成
    const generate3MFXML = (modelData: any): string => {
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<model xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02" unit="millimeter">\n';
        xml += '  <resources>\n';

        // 添加材质
        modelData.materials.forEach((material: any) => {
            xml += `    <basematerials id="${material.id}">\n`;
            xml += `      <base name="${material.name}" displaycolor="${material.color.r} ${material.color.g} ${material.color.b} ${material.color.a}" />\n`;
            xml += '    </basematerials>\n';
        });

        // 添加网格
        modelData.meshes.forEach((mesh: any) => {
            xml += `    <object id="${mesh.id}" type="model">\n`;
            xml += '      <mesh>\n';

            // 顶点
            xml += '        <vertices>\n';
            for (let i = 0; i < mesh.vertices.length; i += 3) {
                xml += `          <vertex x="${mesh.vertices[i]}" y="${mesh.vertices[i + 1]}" z="${mesh.vertices[i + 2]}" />\n`;
            }
            xml += '        </vertices>\n';

            // 如果有顶点颜色，添加颜色信息
            if (mesh.colors && mesh.colors.length > 0) {
                xml += '        <vertexcolors>\n';
                for (let i = 0; i < mesh.colors.length; i += 3) {
                    xml += `          <color r="${mesh.colors[i]}" g="${mesh.colors[i + 1]}" b="${mesh.colors[i + 2]}" />\n`;
                }
                xml += '        </vertexcolors>\n';
            }

            // 三角形
            xml += '        <triangles>\n';
            for (let i = 0; i < mesh.triangles.length; i += 3) {
                // 如果有顶点颜色，不指定材质ID
                const pid = mesh.colors && mesh.colors.length > 0 ? '' : `pid="${mesh.material}"`;
                xml += `          <triangle v1="${mesh.triangles[i]}" v2="${mesh.triangles[i + 1]}" v3="${mesh.triangles[i + 2]}" ${pid} />\n`;
            }
            xml += '        </triangles>\n';

            xml += '      </mesh>\n';
            xml += '    </object>\n';
        });

        xml += '  </resources>\n';
        xml += '  <build>\n';

        // 添加构建项
        modelData.meshes.forEach((mesh: any) => {
            xml += `    <item objectid="${mesh.id}" />\n`;
        });

        xml += '  </build>\n';
        xml += '</model>';

        return xml;
    };

    // 改进的 Content Types XML
    const generateContentTypesXML = (): string => {
        return `<?xml version="1.0" encoding="UTF-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
    <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
    <Default Extension="model" ContentType="application/vnd.ms-package.3dmanufacturing-3dmodel+xml"/>
    <Default Extension="materials" ContentType="application/vnd.ms-package.3dmanufacturing-3dmodel+xml"/>
</Types>`;
    };

    // 改进的 Relationships XML
    const generateRelsXML = (): string => {
        return `<?xml version="1.0" encoding="UTF-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
    <Relationship Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel" Target="/3D/3dmodel.model" Id="rel0"/>
</Relationships>`;
    };

    // 改进的材质 XML 生成
    const generateMaterialsXML = (materials: any[]): string => {
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<materials xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02">\n';

        materials.forEach((material: any) => {
            xml += `  <material id="${material.id}" name="${material.name}">\n`;
            xml += `    <color r="${material.color.r}" g="${material.color.g}" b="${material.color.b}" a="${material.color.a}" />\n`;

            // 添加 PBR 属性
            if (material.metallic !== undefined) {
                xml += `    <metallic value="${material.metallic}" />\n`;
            }
            if (material.roughness !== undefined) {
                xml += `    <roughness value="${material.roughness}" />\n`;
            }
            if (material.emissive) {
                xml += `    <emissive r="${material.emissive.r}" g="${material.emissive.g}" b="${material.emissive.b}" />\n`;
            }

            xml += '  </material>\n';
        });

        xml += '</materials>';
        return xml;
    };

    // 改进的材质数据提取
    const extractMaterialData = async (material: THREE.Material, materialId: number): Promise<any> => {
        const materialData: any = {
            id: materialId,
            name: material.name || `material_${materialId}`,
            color: { r: 1, g: 1, b: 1, a: 1 },
            metallic: 0,
            roughness: 1,
            emissive: { r: 0, g: 0, b: 0 },
            textures: []
        };

        // 处理不同类型的材质
        if (material instanceof THREE.MeshStandardMaterial) {
            // 基础颜色
            materialData.color = {
                r: material.color.r,
                g: material.color.g,
                b: material.color.b,
                a: material.opacity
            };

            // PBR 属性
            materialData.metallic = material.metalness;
            materialData.roughness = material.roughness;

            // 自发光
            materialData.emissive = {
                r: material.emissive.r,
                g: material.emissive.g,
                b: material.emissive.b
            };

            // 处理纹理贴图
            if (material.map) {
                materialData.textures.push({
                    type: 'diffuse',
                    texture: material.map
                });
            }

            if (material.normalMap) {
                materialData.textures.push({
                    type: 'normal',
                    texture: material.normalMap
                });
            }

            if (material.roughnessMap) {
                materialData.textures.push({
                    type: 'roughness',
                    texture: material.roughnessMap
                });
            }

            if (material.metalnessMap) {
                materialData.textures.push({
                    type: 'metallic',
                    texture: material.metalnessMap
                });
            }
        } else if (material instanceof THREE.MeshBasicMaterial) {
            // 基础材质
            materialData.color = {
                r: material.color.r,
                g: material.color.g,
                b: material.color.b,
                a: material.opacity
            };

            if (material.map) {
                materialData.textures.push({
                    type: 'diffuse',
                    texture: material.map
                });
            }
        } else if (material instanceof THREE.MeshLambertMaterial) {
            // Lambert 材质
            materialData.color = {
                r: material.color.r,
                g: material.color.g,
                b: material.color.b,
                a: material.opacity
            };

            if (material.map) {
                materialData.textures.push({
                    type: 'diffuse',
                    texture: material.map
                });
            }
        }

        return materialData;
    };

    // 修改 exportModel 函数，使 3MF 导出异步
    const exportModel = async (scene: THREE.Group, format: string) => {
        return new Promise(async (resolve, reject) => {
            try {
                switch (format) {
                    case 'gltf':
                    case 'glb':
                        const exporter = new GLTFExporter();
                        exporter.parse(
                            scene,
                            result => {
                                if (format === 'glb') {
                                    resolve(result);
                                } else {
                                    resolve(JSON.stringify(result, null, 2));
                                }
                            },
                            reject,
                            {
                                binary: format === 'glb',
                                embedImages: true,
                                animations: true,
                                trs: false,
                                onlyVisible: true,
                                truncateDrawRange: true
                            }
                        );
                        break;

                    case 'obj':
                        try {
                            const objString = exportToOBJ(scene);
                            resolve(objString);
                        } catch (error) {
                            reject(error);
                        }
                        break;

                    case 'stl':
                        try {
                            const stlBuffer = exportToSTL(scene);
                            resolve(stlBuffer);
                        } catch (error) {
                            reject(error);
                        }
                        break;

                    case '3mf':
                        try {
                            const mf3Buffer = await exportTo3MF(scene);
                            resolve(mf3Buffer);
                        } catch (error) {
                            reject(error);
                        }
                        break;

                    default:
                        reject(new Error(`不支持的输出格式: ${format}`));
                }
            } catch (error) {
                reject(error);
            }
        });
    };

    // 修改 convertModel 函数，处理异步 3MF 导出
    const convertModel = async () => {
        if (!originalFile) {
            setError('请先上传模型文件');
            return;
        }

        if (selectedInputFormat === selectedOutputFormat) {
            setError('输入格式和输出格式不能相同');
            return;
        }

        setIsConverting(true);
        setConversionProgress(0);
        setError(null);

        try {
            // 模拟进度更新
            const progressInterval = setInterval(() => {
                setConversionProgress(prev => Math.min(prev + 5, 95));
            }, 100);

            // 1. 读取文件
            setConversionProgress(10);
            const arrayBuffer = await loadFileAsArrayBuffer(originalFile);

            // 2. 加载模型
            setConversionProgress(30);
            const scene = await loadModel(arrayBuffer as ArrayBuffer, selectedInputFormat);

            // 3. 导出模型
            setConversionProgress(70);
            const exportedData = await exportModel(scene as THREE.Group, selectedOutputFormat);

            setConversionProgress(100);

            // 4. 创建下载文件
            let blob: Blob;
            let mimeType: string;

            switch (selectedOutputFormat) {
                case 'glb':
                    blob = new Blob([exportedData as ArrayBuffer], { type: 'model/gltf-binary' });
                    mimeType = 'model/gltf-binary';
                    break;
                case 'gltf':
                    blob = new Blob([exportedData as string], { type: 'application/json' });
                    mimeType = 'application/json';
                    break;
                case 'obj':
                    blob = new Blob([exportedData as string], { type: 'text/plain' });
                    mimeType = 'text/plain';
                    break;
                case 'stl':
                    blob = new Blob([exportedData as ArrayBuffer], { type: 'application/octet-stream' });
                    mimeType = 'application/octet-stream';
                    break;
                case '3mf':
                    blob = new Blob([exportedData as ArrayBuffer], { type: 'application/vnd.ms-package.3dmanufacturing-3dmodel+xml' });
                    mimeType = 'application/vnd.ms-package.3dmanufacturing-3dmodel+xml';
                    break;
                default:
                    blob = new Blob([exportedData as string], { type: 'application/octet-stream' });
                    mimeType = 'application/octet-stream';
            }

            setConvertedFile(blob);
            clearInterval(progressInterval);
        } catch (error) {
            console.error('转换失败:', error);
            setError('转换失败: ' + (error as Error).message);
        } finally {
            setIsConverting(false);
            setConversionProgress(0);
        }
    };

    const downloadConvertedFile = () => {
        if (!convertedFile || !fileInfo) return;

        const extension =
            selectedOutputFormat === 'glb'
                ? '.glb'
                : selectedOutputFormat === 'gltf'
                  ? '.gltf'
                  : selectedOutputFormat === 'obj'
                    ? '.obj'
                    : selectedOutputFormat === 'stl'
                      ? '.stl'
                      : selectedOutputFormat === '3mf'
                        ? '.3mf'
                        : `.${selectedOutputFormat}`;
        const filename = fileInfo.name.replace(/\.[^/.]+$/, '') + extension;

        const url = URL.createObjectURL(convertedFile);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const resetConverter = () => {
        setOriginalFile(null);
        setConvertedFile(null);
        setFileInfo(null);
        setConversionProgress(0);
        setIsConverting(false);
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    // 获取支持的文件扩展名
    const getSupportedExtensions = () => {
        return formatOptions
            .map(f => f.extensions)
            .flat()
            .join(', ');
    };

    // 添加调试函数
    const debug3MFFile = async (zipBuffer: ArrayBuffer) => {
        try {
            const zip = new JSZip();
            const zipFile = await zip.loadAsync(zipBuffer);

            Object.keys(zipFile.files).forEach(filename => {
                console.log(`- ${filename}`);
            });

            // 检查主模型文件
            const modelFile = zipFile.files['3D/3dmodel.model'];
            if (modelFile) {
                const content = await modelFile.async('text');
            }
        } catch (error) {
            console.error('调试 3MF 文件失败:', error);
        }
    };

    return (
        <MainLayout isLanding={true}>
            <section className="pb-24 md:container lg:container">
                {/* 主要内容区域 */}
                <div className="gap-6 sm:gap-12 lg:gap-16">
                    {/* 标题区域 */}
                    <div className="mt-24 mb-24 text-center">
                        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-4 text-4xl font-bold text-white md:text-5xl">
                            {intl.get('fileConverter.title')}
                        </motion.h1>
                        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mb-6 text-lg text-gray-300">
                            {intl.get('fileConverter.description')}
                        </motion.p>
                    </div>

                    {/* 转换器主界面 */}
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="mx-auto mb-16 max-w-4xl">
                        <Card className="border-gray-700 bg-gray-900/50">
                            <CardContent className="p-8">
                                {/* 格式选择区域 */}
                                <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                                    <div className="text-center">
                                        <h3 className="mb-4 text-lg font-semibold text-white">{intl.get('fileConverter.inputFormat')}</h3>
                                        <Select value={selectedInputFormat} onValueChange={setSelectedInputFormat}>
                                            <SelectTrigger className="cursor-pointer border-gray-600 bg-gray-800">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="border-gray-700 bg-[#070707]">
                                                {formatOptions.map(option => (
                                                    <SelectItem key={option.value} value={option.value}>
                                                        <div className="flex cursor-pointer items-center space-x-2 text-white">
                                                            <span>{option.label}</span>
                                                            <Badge variant="secondary" className="text-xs">
                                                                {option.description}
                                                            </Badge>
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="text-center">
                                        <h3 className="mb-4 text-lg font-semibold text-white">{intl.get('fileConverter.outputFormat')}</h3>
                                        <Select value={selectedOutputFormat} onValueChange={setSelectedOutputFormat}>
                                            <SelectTrigger className="cursor-pointer border-gray-600 bg-gray-800">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="border-gray-700 bg-[#070707]">
                                                {formatOptions.map(option => (
                                                    <SelectItem key={option.value} value={option.value}>
                                                        <div className="flex cursor-pointer items-center space-x-2 text-white">
                                                            <span>{option.label}</span>
                                                            <Badge variant="secondary" className="text-xs">
                                                                {option.description}
                                                            </Badge>
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* 文件上传区域 */}
                                <div className="mb-8 text-center">
                                    <div
                                        className="cursor-pointer rounded-lg border-2 border-dashed border-gray-600 bg-gray-800/50 p-8 transition-colors hover:border-[#0084d1]"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <Upload className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                                        <p className="mb-2 text-gray-300">{intl.get('fileConverter.uploadFile1')}</p>
                                        <p className="text-sm text-gray-500">
                                            {intl.get('fileConverter.supportFormat')} {getSupportedExtensions()} {intl.get('fileConverter.supportFormatDescription')}
                                        </p>
                                    </div>
                                    <input ref={fileInputRef} type="file" accept={getSupportedExtensions()} onChange={handleFileUpload} className="hidden" />
                                </div>

                                {/* 错误提示 */}
                                {error && (
                                    <Alert className="mb-6 border-red-500 bg-red-500/10">
                                        <AlertCircle className="h-4 w-4 text-red-500" />
                                        <AlertDescription className="text-red-400">{error}</AlertDescription>
                                    </Alert>
                                )}

                                {/* 文件信息显示 */}
                                {fileInfo && (
                                    <div className="mb-6 rounded-lg bg-gray-800/50 p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <FileText className="h-5 w-5 text-[#0084d1]" />
                                                <div>
                                                    <p className="font-medium text-white">{fileInfo.name}</p>
                                                    <p className="text-sm text-gray-400">{formatFileSize(fileInfo.size)}</p>
                                                </div>
                                            </div>
                                            <Badge variant="outline" className="border-[#0084d1] text-[#0084d1]">
                                                {fileInfo.name.split('.').pop()?.toUpperCase()}
                                            </Badge>
                                        </div>
                                    </div>
                                )}

                                {/* 转换进度 */}
                                {isConverting && (
                                    <div className="mb-6">
                                        <div className="mb-2 flex items-center justify-between">
                                            <span className="text-sm text-gray-300">{intl.get('fileConverter.conversionProgress')}</span>
                                            <span className="text-sm text-[#0084d1]">{conversionProgress}%</span>
                                        </div>
                                        <Progress value={conversionProgress} className="h-2" />
                                    </div>
                                )}

                                {/* 操作按钮 */}
                                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                                    <Button
                                        onClick={convertModel}
                                        disabled={!originalFile || isConverting || selectedInputFormat === selectedOutputFormat}
                                        className="flex-1 bg-[#0084d1] hover:bg-[#0073b8]"
                                    >
                                        {isConverting ? (
                                            <>
                                                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="mr-2">
                                                    <RotateCcw className="h-4 w-4" />
                                                </motion.div>
                                                {intl.get('fileConverter.converting')}
                                            </>
                                        ) : (
                                            <>
                                                <Package className="mr-2 h-4 w-4" />
                                                {intl.get('fileConverter.startConvert')}
                                            </>
                                        )}
                                    </Button>

                                    {convertedFile && (
                                        <Button onClick={downloadConvertedFile} variant="outline" className="flex-1 border-[#0084d1] text-[#0084d1] hover:bg-[#0084d1] hover:text-white">
                                            <Download className="mr-2 h-4 w-4" />
                                            {intl.get('fileConverter.downloadConvert')}
                                        </Button>
                                    )}

                                    <Button onClick={resetConverter} variant="ghost" className="flex-1 text-gray-400 hover:text-white">
                                        {intl.get('fileConverter.reset')}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* 功能特性 */}
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="mb-16">
                        <div className="mb-12 text-center">
                            <h2 className="mb-4 text-3xl font-bold text-white">{intl.get('fileConverter.whyChoose')}</h2>
                            <p className="text-lg text-gray-300">{intl.get('fileConverter.whyChooseDescription')}</p>
                        </div>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            <Card className="border-gray-700 bg-gray-900/50 text-center transition-shadow hover:shadow-lg hover:shadow-[#0084d1]/20">
                                <CardContent className="p-8">
                                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#0084d1]/20">
                                        <Zap className="h-8 w-8 text-[#0084d1]" />
                                    </div>
                                    <h3 className="mb-4 text-xl font-bold text-white">{intl.get('fileConverter.multiFormatSupport')}</h3>
                                    <p className="text-gray-300">{intl.get('fileConverter.multiFormatSupportDescription')}</p>
                                </CardContent>
                            </Card>

                            <Card className="border-gray-700 bg-gray-900/50 text-center transition-shadow hover:shadow-lg hover:shadow-[#0084d1]/20">
                                <CardContent className="p-8">
                                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
                                        <Shield className="h-8 w-8 text-green-500" />
                                    </div>
                                    <h3 className="mb-4 text-xl font-bold text-white">{intl.get('fileConverter.dataSecurity')}</h3>
                                    <p className="text-gray-300">{intl.get('fileConverter.dataSecurityDescription')}</p>
                                </CardContent>
                            </Card>

                            <Card className="border-gray-700 bg-gray-900/50 text-center transition-shadow hover:shadow-lg hover:shadow-[#0084d1]/20">
                                <CardContent className="p-8">
                                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/20">
                                        <Globe className="h-8 w-8 text-purple-500" />
                                    </div>
                                    <h3 className="mb-4 text-xl font-bold text-white">{intl.get('fileConverter.qualityAssurance')}</h3>
                                    <p className="text-gray-300">{intl.get('fileConverter.qualityAssuranceDescription')}</p>
                                </CardContent>
                            </Card>
                        </div>
                    </motion.div>

                    {/* 使用说明 */}
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="mb-16">
                        <div className="mb-12 text-center">
                            <h2 className="mb-4 text-3xl font-bold text-white">{intl.get('fileConverter.howToUse')}</h2>
                            <p className="text-lg text-gray-300">{intl.get('fileConverter.howToUseDescription')}</p>
                        </div>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            <div className="text-center">
                                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#0084d1]">
                                    <span className="text-2xl font-bold text-white">1</span>
                                </div>
                                <h3 className="mb-4 text-xl font-bold text-white">{intl.get('fileConverter.selectFormat')}</h3>
                                <p className="text-gray-300">{intl.get('fileConverter.selectFormatDescription')}</p>
                            </div>

                            <div className="text-center">
                                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500">
                                    <span className="text-2xl font-bold text-white">2</span>
                                </div>
                                <h3 className="mb-4 text-xl font-bold text-white">{intl.get('fileConverter.uploadFile')}</h3>
                                <p className="text-gray-300">{intl.get('fileConverter.uploadFileDescription')}</p>
                            </div>

                            <div className="text-center">
                                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500">
                                    <span className="text-2xl font-bold text-white">3</span>
                                </div>
                                <h3 className="mb-4 text-xl font-bold text-white">{intl.get('fileConverter.downloadResult')}</h3>
                                <p className="text-gray-300">{intl.get('fileConverter.downloadResultDescription')}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* 常见问题 */}
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.0 }} className="mx-auto max-w-4xl">
                        <div className="mb-12 text-center">
                            <h2 className="mb-4 text-3xl font-bold text-white">{intl.get('fileConverter.faq')}</h2>
                        </div>

                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1" className="cursor-pointer border-gray-700">
                                <AccordionTrigger className="cursor-pointer text-left text-gray-300 hover:text-white">{intl.get('fileConverter.faq.question1')}</AccordionTrigger>
                                <AccordionContent className="text-gray-400">{intl.get('fileConverter.faq.answer1')}</AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-2" className="border-gray-700">
                                <AccordionTrigger className="cursor-pointer text-left text-gray-300 hover:text-white">{intl.get('fileConverter.faq.question2')}</AccordionTrigger>
                                <AccordionContent className="text-gray-400">{intl.get('fileConverter.faq.answer2')}</AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-3" className="border-gray-700">
                                <AccordionTrigger className="cursor-pointer text-left text-gray-300 hover:text-white">{intl.get('fileConverter.faq.question3')}</AccordionTrigger>
                                <AccordionContent className="text-gray-400">{intl.get('fileConverter.faq.answer3')}</AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-4" className="border-gray-700">
                                <AccordionTrigger className="cursor-pointer text-left text-gray-300 hover:text-white">{intl.get('fileConverter.faq.question4')}</AccordionTrigger>
                                <AccordionContent className="text-gray-400">{intl.get('fileConverter.faq.answer4')}</AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-5" className="border-gray-700">
                                <AccordionTrigger className="cursor-pointer text-left text-gray-300 hover:text-white">{intl.get('fileConverter.faq.question5')}</AccordionTrigger>
                                <AccordionContent className="text-gray-400">{intl.get('fileConverter.faq.answer5')}</AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </motion.div>
                </div>
            </section>
        </MainLayout>
    );
}
