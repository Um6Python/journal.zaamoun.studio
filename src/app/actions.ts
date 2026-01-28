'use server'

import fs from 'fs';
import path from 'path';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

function slugify(text: string) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')     // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-')   // Replace multiple - with single -
        .replace(/^-+/, '')       // Trim - from start of text
        .replace(/-+$/, '');      // Trim - from end of text
}

export async function createEntry(formData: FormData) {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const mood = formData.get('mood') as string;
    const trackUri = formData.get('track_uri') as string;
    const caption = formData.get('caption') as string;
    const tagsString = formData.get('tags') as string;

    const date = new Date();
    const dateStr = date.toISOString();

    // Create a slug from title or date
    let slug = title ? slugify(title) : `entry-${Date.now()}`;
    // Ensure unique filename by appending timestamp if needed (simple check)
    const filename = `${date.toISOString().split('T')[0]}-${slug}.mdx`;
    const filePath = path.join(process.cwd(), 'content/journal', filename);

    const tags = tagsString
        ? tagsString.split(',').map(t => t.trim()).filter(Boolean)
        : [];

    // Construct Frontmatter
    let fileContent = `---
date: "${dateStr}"
`;

    if (title) fileContent += `title: "${title}"\n`;
    if (mood) fileContent += `mood: "${mood}"\n`;
    if (tags.length > 0) fileContent += `tags: [${tags.map(t => `"${t}"`).join(', ')}]\n`;

    if (trackUri || caption) {
        fileContent += `music:\n`;
        if (trackUri) fileContent += `  track_uri: "${trackUri}"\n`;
        if (caption) fileContent += `  caption: "${caption}"\n`;
    }

    fileContent += `---\n\n${content}`;

    // Write to disk
    try {
        // Ensure directory exists (it should, but safety first)
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(filePath, fileContent, 'utf8');

        // Revalidate the home page to show new entry
        revalidatePath('/');
    } catch (error) {
        console.error("Failed to save entry:", error);
        throw new Error("Failed to save journal entry.");
    }

    redirect('/');
}
