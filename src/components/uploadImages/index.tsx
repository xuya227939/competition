import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ImagePlus, Cloud, MonitorSmartphone } from 'lucide-react';
import intl from 'react-intl-universal';
import { Button } from '@/components/ui/button';
import { useState, useImperativeHandle, forwardRef } from 'react';
import { toast } from '@/components/ui/use-toast';

// 定义组件引用类型
export interface UploadImagesRef {
    removeImage: (indexToRemove: number) => void;
}

export interface UploadImagesProps {
    showAddImageText: boolean;
    onUploadSuccess: (data: { images: File[]; imagePreviewUrl: string[] }) => void;
    uploadCount: number;
}

export const UploadImages = forwardRef<UploadImagesRef, UploadImagesProps>((props, ref) => {
    const [uploadMenuOpen, setUploadMenuOpen] = useState(false);
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string[]>([]);

    // 处理文件上传
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        // 创建新的图片数组
        const newImages = [...selectedImages];

        // 添加新文件，但不超过4张的限制
        Array.from(files).forEach(file => {
            if (newImages.length < 4) {
                newImages.push(file);
            }
        });

        // 如果添加的图片超出限制，显示提示
        if (selectedImages.length + files.length > props.uploadCount) {
            toast({
                title: intl.get('uploadImages.button.selectFailed'),
                description: intl.get('uploadImages.button.selectFailedDescription'),
                variant: 'destructive'
            });
        }

        // 更新状态
        setSelectedImages(newImages);
        setImagePreviewUrl(newImages.map(file => URL.createObjectURL(file)));
        props.onUploadSuccess({
            images: newImages,
            imagePreviewUrl: newImages.map(file => URL.createObjectURL(file))
        });
    };

    // 处理本地上传
    const handleDeviceUpload = () => {
        // 如果已达到最大数量，显示提示并返回
        if (selectedImages.length >= props.uploadCount) {
            toast({
                title: intl.get('uploadImages.button.cannotAddMoreImages'),
                description: intl.get('uploadImages.button.reachedMaxLimit'),
                variant: 'destructive'
            });
            return;
        }

        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.multiple = true; // 允许多选

        // 设置可选择的最大数量
        const remainingSlots = props.uploadCount - selectedImages.length;
        if (remainingSlots === 1) {
            // 如果只剩一个位置，禁用多选
            input.multiple = false;
        }

        input.onchange = e => handleFileUpload(e as unknown as React.ChangeEvent<HTMLInputElement>);
        input.click();
    };

    // 移除图片的方法
    const removeImage = (indexToRemove: number) => {
        const newImages = selectedImages.filter((_, index) => index !== indexToRemove);
        const newUrls = imagePreviewUrl.filter((_, index) => index !== indexToRemove);

        setSelectedImages(newImages);
        setImagePreviewUrl(newUrls);

        // 通知父组件更新
        props.onUploadSuccess({
            images: newImages,
            imagePreviewUrl: newUrls
        });
    };

    // 使用 useImperativeHandle 暴露方法给父组件
    useImperativeHandle(ref, () => ({
        removeImage
    }));

    return (
        <Popover open={uploadMenuOpen} onOpenChange={() => setUploadMenuOpen(!uploadMenuOpen)}>
            <PopoverTrigger>
                <Button
                    variant="ghost"
                    icon={<ImagePlus className="size-5" />}
                    onClick={() => setUploadMenuOpen(!uploadMenuOpen)}
                >
                    {props.showAddImageText ? (
                        <span>{intl.get('uploadImages.button.addImage')}</span>
                    ) : (
                        ''
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="h-[--radix-select-trigger-height] w-full min-w-[--radix-select-trigger-width] p-2">
                <div
                    className={cn('mb-2 flex cursor-pointer items-center rounded-md p-2')}
                    onClick={() => {
                        setUploadMenuOpen(false);
                        handleDeviceUpload();
                    }}
                >
                    <MonitorSmartphone size={20} />
                    <span className="ml-2">{intl.get('uploadImages.button.deviceUpload')}</span>
                </div>
                {/* <div
                    className={cn(
                        'mb-2 flex cursor-pointer items-center rounded-md p-2 hover:bg-gray-100'
                    )}
                    onClick={() => {
                        setUploadMenuOpen(false);
                        handleDeviceUpload();
                    }}
                >
                    <Cloud size={20} />
                    <span className="ml-2">{intl.get('uploadImages.button.mySpace')}</span>
                </div> */}
            </PopoverContent>
        </Popover>
    );
});

// 添加显示名称
UploadImages.displayName = 'UploadImages';
