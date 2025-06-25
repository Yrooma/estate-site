import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ message: 'This API is development-only' }, { status: 403 });
  }

  try {
    // It's better to be specific about what you're adding
    await execPromise('git add app/data/properties.ts');
    const { stdout: statusOutput } = await execPromise('git status --porcelain');

    if (!statusOutput) {
      return NextResponse.json({ message: 'No changes to commit' }, { status: 200 });
    }

    const commitMessage = `Update properties data from admin UI at ${new Date().toISOString()}`;
    await execPromise(`git commit -m "${commitMessage}"`);
    await execPromise('git push');

    return NextResponse.json({ message: 'Successfully pushed to GitHub' }, { status: 200 });
  } catch (error) {
    console.error('Error pushing to GitHub:', error);
    // Provide more specific error feedback if possible
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ message: 'Failed to push to GitHub', error: errorMessage }, { status: 500 });
  }
}
