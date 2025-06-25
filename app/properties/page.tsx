import { Metadata } from 'next';
import { properties } from "@/app/data/properties";
import { PropertyFilter } from '@/components/property-filter';
import { Breadcrumbs } from '@/components/breadcrumbs';

export const metadata: Metadata = {
  title: 'قائمة العقارات | أبو عمر للعقار',
  description: 'تصفح قائمة العقارات المتاحة للبيع والإيجار في مكة والطائف. فلل، شقق، وأراضي سكنية.',
  keywords: ['عقارات للبيع', 'عقارات للإيجار', 'شقق في مكة', 'فلل في الطائف', 'أراضي سكنية'],
};

export default function PropertiesPage() {
  return (
    <>
      <Breadcrumbs />
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">العقارات المتاحة</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            تصفح أحدث العروض العقارية المتوفرة لدينا في مكة المكرمة والطائف. نساعدك في العثور على ما يناسبك.
          </p>
        </header>
        
        <PropertyFilter properties={properties} />
        
      </div>
    </>
  );
}
