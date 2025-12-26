import intl from 'react-intl-universal';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { useState } from 'react';
import type { PropsWithoutRef } from 'react';
import { showToast } from '@/utils';
import { VLink } from '@/components/navigation/VLink';

function MenuItem(props: PropsWithoutRef<{ title: string; onClick?: () => void }>) {
    return (
        // @ts-ignore
        <li className="cursor-pointer text-gray-300 transition-colors" {...props}>
            {props.title}
        </li>
    );
}

function DialogMenuItem() {
    return [
        { path: '/online-viewer', key: 'footer.col5.subTitle' },
        { path: '/model-compression', key: 'footer.col5.subTitle2' },
        { path: '/file-converter', key: 'footer.col5.subTitle3' },
        {
            type: 'div',
            key: 'footer.col5.subTitle4',
            onClick: () => {
                showToast({
                    description: intl.get('footer.col5.subTitle4.tips')
                });
            }
        }
    ].map((item, index) => (
        <div
            key={index}
            className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm text-white transition-all duration-200 hover:bg-[#262626]"
            onClick={item.type === 'div' ? item.onClick : undefined}
        >
            {item.type === 'div' ? (
                <span>{intl.get(item.key)}</span>
            ) : (
                <VLink href={item.path || '/'} className="flex w-full items-center">
                    {intl.get(item.key)}
                </VLink>
            )}
        </div>
    ));
}

export const ResourceDialog = () => {
    const [openResource, setOpenResource] = useState(false);

    return (
        <Popover open={openResource} onOpenChange={() => setOpenResource(!openResource)}>
            <PopoverTrigger>
                <MenuItem title={intl.get('landing.header.text5')} onClick={() => setOpenResource(!openResource)} />
            </PopoverTrigger>
            <PopoverContent side="bottom" className="rounded-md border border-gray-700 bg-[#070707] p-2">
                <div className="space-y-1">{DialogMenuItem()}</div>
            </PopoverContent>
        </Popover>
    );
};

export const MobileResourceDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <MenuItem title={intl.get('landing.header.text5')} />
            </DialogTrigger>
            <DialogContent className="!w-none w-sm">
                <DialogHeader>
                    <DialogTitle>{intl.get('landing.lanauage.dialog.title')}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">{DialogMenuItem()}</div>
            </DialogContent>
        </Dialog>
    );
};
