export interface Property {
  id: number;
  slug: string;
  title: string;
  description: string;
  price: string;
  status: 'للبيع' | 'للإيجار' | 'تم البيع' | 'مؤجر';
  type: 'شقة' | 'فيلا' | 'أرض' | 'عمارة' | 'دور';
  location: {
    city: 'مكة المكرمة' | 'الطائف';
    district: string;
  };
  area: number; // in square meters
  bedrooms?: number;
  bathrooms?: number;
  images: string[];
  mainImage: string;
  keywords: string[];
  features?: string[];
  yearBuilt?: number;
  agent: {
    name: string;
    phone: string;
  };
}
