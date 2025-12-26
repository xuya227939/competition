import { Vector3, Euler } from 'three';
import * as THREE from 'three';

export interface SceneNode {
    id: string;
    name: string;
    type: string;
    visible?: boolean;
    children?: SceneNode[];
    object?: THREE.Object3D;
}

export interface EditorStateType {
    modelUrl: string;
    selectedObject: string | null;
    tree: any[];
}
