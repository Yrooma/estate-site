'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PropertyCard } from '@/components/property-card';
import type { Property } from '@/types/property';
import { Search } from 'lucide-react';

interface PropertyFilterProps {
  properties: Property[];
}

export function PropertyFilter({ properties }: PropertyFilterProps) {
  const [filters, setFilters] = useState({
    keyword: '',
    type: 'الكل',
    status: 'الكل',
    city: 'الكل',
  });

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const { keyword, type, status, city } = filters;
      if (keyword && !property.title.includes(keyword) && !property.description.includes(keyword)) {
        return false;
      }
      if (type !== 'الكل' && property.type !== type) {
        return false;
      }
      if (status !== 'الكل' && property.status !== status) {
        return false;
      }
      if (city !== 'الكل' && property.location.city !== city) {
        return false;
      }
      return true;
    });
  }, [properties, filters]);

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const propertyTypes = ['الكل', ...Array.from(new Set(properties.map(p => p.type)))];
  const propertyStatuses = ['الكل', ...Array.from(new Set(properties.map(p => p.status)))];
  const propertyCities = ['الكل', ...Array.from(new Set(properties.map(p => p.location.city)))];

  return (
    <>
      <div className="bg-muted p-6 rounded-lg mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="ابحث بالاسم أو الوصف..."
              className="pr-10"
              value={filters.keyword}
              onChange={(e) => handleFilterChange('keyword', e.target.value)}
            />
          </div>
          <Select onValueChange={(value: string) => handleFilterChange('type', value)} defaultValue="الكل">
            <SelectTrigger>
              <SelectValue placeholder="نوع العقار" />
            </SelectTrigger>
            <SelectContent>
              {propertyTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select onValueChange={(value: string) => handleFilterChange('status', value)} defaultValue="الكل">
            <SelectTrigger>
              <SelectValue placeholder="حالة العقار" />
            </SelectTrigger>
            <SelectContent>
              {propertyStatuses.map(status => <SelectItem key={status} value={status}>{status}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select onValueChange={(value: string) => handleFilterChange('city', value)} defaultValue="الكل">
            <SelectTrigger>
              <SelectValue placeholder="المدينة" />
            </SelectTrigger>
            <SelectContent>
              {propertyCities.map(city => <SelectItem key={city} value={city}>{city}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground">لا توجد عقارات تطابق معايير البحث.</p>
        </div>
      )}
    </>
  );
}
