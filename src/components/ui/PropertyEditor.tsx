import { useEditorStore } from '@store/editorStore';
import { Button } from './button';
import { Plus, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export const PropertyEditor = () => {
    const { selectedObject, updateObject }: any = useEditorStore();

    return (
        <div className="space-y-4 p-4">
            {/* States */}
            <PropertySection title="States" defaultOpen={false}>
                <div className="text-sm text-gray-400">No states defined</div>
            </PropertySection>

            {/* Events */}
            <PropertySection title="Events" defaultOpen={false}>
                <div className="text-sm text-gray-400">No events defined</div>
            </PropertySection>

            {/* Position */}
            {/* <PropertySection title="Position" defaultOpen={true}>
                <Vector3Input
                    value={selectedObjectData.position}
                    onChange={value =>
                        updateObject(selectedObjectData.id, selectedObject, { position: value })
                    }
                />
            </PropertySection> */}

            {/* Scale */}
            {/* <PropertySection title="Scale" defaultOpen={true}>
                <Vector3Input
                    value={selectedObjectData.scale}
                    onChange={value =>
                        updateObject(selectedObjectData.id, selectedObject, { scale: value })
                    }
                />
            </PropertySection> */}

            {/* Rotation */}
            {/* <PropertySection title="Rotation" defaultOpen={true}>
                <Vector3Input
                    value={selectedObjectData.rotation}
                    onChange={value =>
                        updateObject(selectedObjectData.id, selectedObject, { rotation: value })
                    }
                />
            </PropertySection> */}

            {/* Snap Settings */}
            <PropertySection title="Snap Settings" defaultOpen={true}>
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-sm">Snapping</span>
                        <input type="checkbox" className="h-4 w-4" />
                    </div>
                    <div className="flex space-x-1">
                        <Button variant="ghost" size="sm" className="bg-gray-700 px-2 py-1 text-xs">
                            Object
                        </Button>
                        <Button variant="ghost" size="sm" className="bg-blue-600 px-2 py-1 text-xs">
                            Grid
                        </Button>
                        <Button variant="ghost" size="sm" className="bg-gray-700 px-2 py-1 text-xs">
                            Off
                        </Button>
                    </div>
                </div>
            </PropertySection>

            {/* Shape */}
            <PropertySection title="Shape" defaultOpen={true}>
                <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="text-xs text-gray-400">Size X</label>
                            <input
                                type="number"
                                value="1145.94"
                                className="w-full rounded border border-gray-600 bg-gray-700 px-2 py-1 text-sm"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-gray-400">Size Y</label>
                            <input
                                type="number"
                                value="935.23"
                                className="w-full rounded border border-gray-600 bg-gray-700 px-2 py-1 text-sm"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs text-gray-400">Subdivision</label>
                        <input
                            type="number"
                            value="12"
                            className="w-full rounded border border-gray-600 bg-gray-700 px-2 py-1 text-sm"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="text-xs text-gray-400">Corner</label>
                            <input
                                type="number"
                                value="0"
                                className="w-full rounded border border-gray-600 bg-gray-700 px-2 py-1 text-sm"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-gray-400">Extrusion</label>
                            <input
                                type="number"
                                value="0"
                                className="w-full rounded border border-gray-600 bg-gray-700 px-2 py-1 text-sm"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="text-xs text-gray-400">Bevel</label>
                            <input
                                type="number"
                                value="0"
                                className="w-full rounded border border-gray-600 bg-gray-700 px-2 py-1 text-sm"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-gray-400">Bevel Sides</label>
                            <input
                                type="number"
                                value="1"
                                className="w-full rounded border border-gray-600 bg-gray-700 px-2 py-1 text-sm"
                            />
                        </div>
                    </div>
                    <Button variant="ghost" size="sm" className="w-full text-xs">
                        Convert to Path
                    </Button>
                </div>
            </PropertySection>

            {/* Material */}
            <PropertySection title="Material" defaultOpen={true}>
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-sm">Image</span>
                        <div className="flex items-center space-x-2">
                            <input type="checkbox" className="h-4 w-4" defaultChecked />
                            <input
                                type="number"
                                value="100"
                                className="w-12 rounded border border-gray-600 bg-gray-700 px-1 py-1 text-xs"
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm">Lighting</span>
                        <div className="flex items-center space-x-2">
                            <input type="checkbox" className="h-4 w-4" defaultChecked />
                            <input
                                type="number"
                                value="60"
                                className="w-12 rounded border border-gray-600 bg-gray-700 px-1 py-1 text-xs"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <div className="h-4 w-4 rounded bg-pink-500"></div>
                            <span className="text-sm">orange_waves</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="h-4 w-4 rounded bg-red-500"></div>
                            <span className="text-sm">red</span>
                        </div>
                    </div>
                </div>
            </PropertySection>

            {/* Align To Path */}
            <PropertySection title="Align To Path" defaultOpen={true}>
                <select className="w-full rounded border border-gray-600 bg-gray-700 px-2 py-1 text-sm">
                    <option>Object</option>
                    <option selected>None</option>
                </select>
            </PropertySection>

            {/* Cloner */}
            <PropertySection title="Cloner" defaultOpen={true}>
                <div className="flex items-center justify-between">
                    <span className="text-sm">Enabled</span>
                    <input type="checkbox" className="h-4 w-4" />
                </div>
            </PropertySection>

            {/* Collision */}
            <PropertySection title="Collision" defaultOpen={true}>
                <select className="w-full rounded border border-gray-600 bg-gray-700 px-2 py-1 text-sm">
                    <option>Enabled</option>
                    <option selected>Based on Visibility</option>
                </select>
            </PropertySection>

            {/* Visibility */}
            <PropertySection title="Visibility" defaultOpen={true}>
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-sm">Wireframe</span>
                        <select className="rounded border border-gray-600 bg-gray-700 px-2 py-1 text-xs">
                            <option>Show</option>
                            <option>Hide</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm">Flat</span>
                        <select className="rounded border border-gray-600 bg-gray-700 px-2 py-1 text-xs">
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm">Sides</span>
                        <select className="rounded border border-gray-600 bg-gray-700 px-2 py-1 text-xs">
                            <option>Both</option>
                            <option>Front</option>
                            <option>Back</option>
                        </select>
                    </div>
                </div>
            </PropertySection>
        </div>
    );
};

interface PropertySectionProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

const PropertySection = ({ title, children, defaultOpen = true }: PropertySectionProps) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="rounded border border-gray-700">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between p-2 transition-colors hover:bg-gray-700"
            >
                <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{title}</span>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 text-white hover:bg-gray-600"
                    >
                        <Plus className="h-3 w-3" />
                    </Button>
                </div>
                {isOpen ? (
                    <ChevronDown className="h-4 w-4" />
                ) : (
                    <ChevronRight className="h-4 w-4" />
                )}
            </button>
            {isOpen && <div className="border-t border-gray-700 p-2">{children}</div>}
        </div>
    );
};

interface Vector3InputProps {
    value: { x: number; y: number; z: number };
    onChange: (value: { x: number; y: number; z: number }) => void;
}

const Vector3Input = ({ value, onChange }: Vector3InputProps) => {
    const handleChange = (axis: 'x' | 'y' | 'z', newValue: number) => {
        onChange({ ...value, [axis]: newValue });
    };

    return (
        <div className="grid grid-cols-3 gap-2">
            <div>
                <label className="text-xs text-gray-400">X</label>
                <input
                    type="number"
                    value={value.x}
                    onChange={e => handleChange('x', parseFloat(e.target.value) || 0)}
                    className="w-full rounded border border-gray-600 bg-gray-700 px-2 py-1 text-sm"
                />
            </div>
            <div>
                <label className="text-xs text-gray-400">Y</label>
                <input
                    type="number"
                    value={value.y}
                    onChange={e => handleChange('y', parseFloat(e.target.value) || 0)}
                    className="w-full rounded border border-gray-600 bg-gray-700 px-2 py-1 text-sm"
                />
            </div>
            <div>
                <label className="text-xs text-gray-400">Z</label>
                <input
                    type="number"
                    value={value.z}
                    onChange={e => handleChange('z', parseFloat(e.target.value) || 0)}
                    className="w-full rounded border border-gray-600 bg-gray-700 px-2 py-1 text-sm"
                />
            </div>
        </div>
    );
};
