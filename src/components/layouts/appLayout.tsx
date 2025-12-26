import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
export function AppLayout() {
    return (
        <div className="bg-background text-foreground flex h-screen overflow-hidden">
            <SidebarProvider>
                {/* Left Sidebar */}
                {/* Main Content */}
                <SidebarInset className="h-full min-h-0 overflow-hidden bg-[#070707]"></SidebarInset>
            </SidebarProvider>
        </div>
    );
}
