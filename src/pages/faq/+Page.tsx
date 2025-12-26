import MainLayout from '@/components/layouts/mainLayout';
import { PageSEO } from '@/components/seo/pageSEO';
import { FaqC } from '@/components/faq';

export function Page() {
    return (
        <>
            <PageSEO pageKey="faq" />
            <MainLayout>
                <div className="container mx-auto py-12">
                    <FaqC containerClassName="" />
                </div>
            </MainLayout>
        </>
    );
}
