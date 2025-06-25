import { promises as fs } from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { properties } from '@/app/data/properties';
import { Property } from '@/types/property';

const dataFilePath = path.join(process.cwd(), 'app', 'data', 'properties.ts');

export async function PUT(req: NextRequest) {
  try {
    const updatedProperty: Property = await req.json();
    const propertyIndex = properties.findIndex(p => p.id === updatedProperty.id);

    if (propertyIndex === -1) {
      return new NextResponse(JSON.stringify({ message: 'Property not found' }), { status: 404 });
    }

    const updatedProperties = [...properties];
    updatedProperties[propertyIndex] = updatedProperty;

    const fileContent = `import { Property } from '@/types/property';

export const properties: Property[] = ${JSON.stringify(updatedProperties, null, 2)};
`;

    await fs.writeFile(dataFilePath, fileContent, 'utf8');

    return new NextResponse(JSON.stringify({ message: 'Property updated successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error updating property:', error);
    return new NextResponse(JSON.stringify({ message: 'Error updating property' }), { status: 500 });
  }
}
