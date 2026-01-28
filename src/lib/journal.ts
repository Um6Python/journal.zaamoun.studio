import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content/journal');

export interface JournalFrontmatter {
    title?: string;
    date: string;
    tags?: string[];
    mood?: string;
    music?: {
        track_uri?: string;
        context?: string;
        caption?: string;
    }
    reflection_prompts?: string[];
}

export interface JournalEntry {
    slug: string;
    frontmatter: JournalFrontmatter;
    content: string;
}

export function getAllEntries(): JournalEntry[] {
    if (!fs.existsSync(contentDirectory)) return [];

    const fileNames = fs.readdirSync(contentDirectory);
    const allPostsData = fileNames
        .filter(fileName => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
        .map((fileName) => {
            const slug = fileName.replace(/\.mdx?$/, '');
            const fullPath = path.join(contentDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data, content } = matter(fileContents);

            return {
                slug,
                frontmatter: data as JournalFrontmatter,
                content,
            };
        });

    // Sort posts by date desc
    return allPostsData.sort((a, b) => {
        const dateA = new Date(a.frontmatter.date).getTime();
        const dateB = new Date(b.frontmatter.date).getTime();
        return dateB - dateA;
    });
}

export function getEntryBySlug(slug: string): JournalEntry | null {
    try {
        // Try mdx first
        let fullPath = path.join(contentDirectory, `${slug}.mdx`);
        if (!fs.existsSync(fullPath)) {
            fullPath = path.join(contentDirectory, `${slug}.md`);
        }

        if (!fs.existsSync(fullPath)) return null;

        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            slug,
            frontmatter: data as JournalFrontmatter,
            content,
        };
    } catch (e) {
        console.error("Error reading entry:", e);
        return null;
    }
}
