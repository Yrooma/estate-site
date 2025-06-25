import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { Property } from '@/types/property';

const propertiesFilePath = path.join(process.cwd(), 'app/data/properties.ts');

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ message: 'This API is development-only' }, { status: 403 });
  }

  try {
    const newProperty: Property = await req.json();

    const fileContent = await fs.readFile(propertiesFilePath, 'utf-8');
    
    // Extract the array from the file content
    const match = fileContent.match(/export const properties: Property\[] = (\[[\s\S]*?\]);/);
    if (!match) {
      throw new Error('Could not find properties array in the file.');
    }

    // This is unsafe, but we'll proceed for this development-only feature.
    // A proper solution would use a real parser.
    const propertiesString = match[1].replace(/'/g, '"'); // Replace single quotes for JSON parsing
    let properties = [];
    try {
        // A bit of a hack to make it valid JSON
        const parsableString = propertiesString
            .replace(/(\w+):/g, '"$1":') // Add quotes to keys
            .replace(/,\s*\]/g, ']'); // Remove trailing commas
        properties = JSON.parse(parsableString);
    } catch(e) {
        // Fallback for more complex cases - this is very brittle
        const arrayStartIndex = fileContent.indexOf('[');
        const arrayEndIndex = fileContent.lastIndexOf(']');
        const arrayString = fileContent.substring(arrayStartIndex, arrayEndIndex + 1);
        const items = eval('(' + arrayString + ')');
        properties = items;
    }

    properties.push(newProperty);

    const updatedPropertiesString = JSON.stringify(properties, null, 2)
      .replace(/"/g, "'") // Use single quotes
      .replace(/'(\w+)':/g, '$1:'); // Remove quotes from keys

    const updatedContent = `import { Property } from '@/types/property';\n\nexport const properties: Property[] = ${updatedPropertiesString};`;

    await fs.writeFile(propertiesFilePath, updatedContent, 'utf-8');

    return NextResponse.json({ message: 'Property added successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error adding property:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
