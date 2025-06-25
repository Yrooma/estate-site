import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ message: 'This API is development-only' }, { status: 403 });
  }

  try {
    const data = await req.formData();
    const files: File[] = data.getAll('files') as unknown as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ message: 'No files uploaded' }, { status: 400 });
    }

    const uploadedFilePaths = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileExtension = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExtension}`;
      const filePath = join(process.cwd(), 'public', 'images', 'p', fileName);

      await writeFile(filePath, buffer);
      uploadedFilePaths.push(`/images/p/${fileName}`);
    }

    return NextResponse.json({ message: 'Files uploaded successfully', paths: uploadedFilePaths }, { status: 200 });
  } catch (error) {
    console.error('Error uploading files:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
