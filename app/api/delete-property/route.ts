import { promises as fs } from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { properties } from '@/app/data/properties';

const dataFilePath = path.join(process.cwd(), 'app', 'data', 'properties.ts');

export async function DELETE(req: NextRequest) {
  try {
    const { slug } = await req.json();
    const propertyIndex = properties.findIndex(p => p.slug === slug);

    if (propertyIndex === -1) {
      return new NextResponse(JSON.stringify({ message: 'Property not found' }), { status: 404 });
    }

    const updatedProperties = properties.filter(p => p.slug !== slug);

    const fileContent = `import { Property } from '@/types/property';

export const properties: Property[] = ${JSON.stringify(updatedProperties, null, 2)};
`;

    await fs.writeFile(dataFilePath, fileContent, 'utf8');

    return new NextResponse(JSON.stringify({ message: 'Property deleted successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error deleting property:', error);
    return new NextResponse(JSON.stringify({ message: 'Error deleting property' }), { status: 500 });
  }
}
