import MainLayout from '@/components/layouts/mainLayout';
import { PageSEO } from '@/components/seo/pageSEO';
import { Price } from '@/components/price';

export function Page() {
    return (
        <>
            <PageSEO pageKey="pricing" />
            <MainLayout>
                <div className="container mx-auto py-12">
                    <Price
                        defaultPlan="basic"
                        defaultInterval="monthly"
                        onPlanSelect={(plan) => {}}
                        containerClassName=""
                    />
                </div>
            </MainLayout>
        </>
    );
}
