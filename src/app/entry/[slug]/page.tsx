import { getEntryBySlug, getAllEntries } from '@/lib/journal';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { SpotifyEmbed } from '@/components/spotify-embed';
import { ReflectionPrompts } from '@/components/reflection-prompts';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export async function generateStaticParams() {
    const entries = getAllEntries();
    return entries.map((entry) => ({
        slug: entry.slug,
    }));
}

export default async function EntryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const entry = getEntryBySlug(slug);

    if (!entry) {
        notFound();
    }

    const components = {
        SpotifyEmbed: (props: any) => <SpotifyEmbed {...props} />,
        h1: (props: any) => <h1 className="text-3xl font-serif mt-10 mb-6 font-bold text-foreground" {...props} />,
        h2: (props: any) => <h2 className="text-2xl font-serif mt-8 mb-4 font-semibold text-foreground/90" {...props} />,
        p: (props: any) => <p className="mb-6 leading-relaxed text-lg text-foreground/80 font-serif" {...props} />,
        blockquote: (props: any) => <blockquote className="border-l-2 border-accent pl-6 italic text-muted-foreground my-8 text-xl" {...props} />,
        ul: (props: any) => <ul className="list-disc list-outside ml-6 mb-6 space-y-2 text-foreground/80 font-serif text-lg" {...props} />,
        li: (props: any) => <li className="pl-1" {...props} />,
        a: (props: any) => <a className="text-foreground underline decoration-accent decoration-2 underline-offset-4 hover:decoration-foreground transition-all" {...props} />,
        hr: (props: any) => <hr className="border-border/40 my-10" {...props} />,
    };

    return (
        <main className="min-h-screen py-10 md:py-24 px-6 flex justify-center">
            <div className="max-w-2xl w-full">
                <Link href="/" className="inline-flex items-center text-sm text-muted hover:text-foreground transition-colors mb-12 font-sans group">
                    <ArrowLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" />
                    Back to Journal
                </Link>

                <header className="mb-14 text-center">
                    <div className="text-xs font-sans text-muted font-medium tracking-[0.2em] uppercase mb-4">
                        {format(new Date(entry.frontmatter.date), 'MMMM do, yyyy')}
                    </div>

                    {entry.frontmatter.title && (
                        <h1 className="text-3xl md:text-5xl font-serif font-medium text-foreground tracking-tight leading-tight">{entry.frontmatter.title}</h1>
                    )}
                    {!entry.frontmatter.title && (
                        <h1 className="text-3xl md:text-5xl font-serif font-medium text-foreground tracking-tight leading-tight">
                            {format(new Date(entry.frontmatter.date), 'EEEE')}
                        </h1>
                    )}

                    {entry.frontmatter.tags && (
                        <div className="flex gap-2 justify-center mt-6">
                            {entry.frontmatter.tags.map(tag => (
                                <span key={tag} className="text-[10px] uppercase tracking-wider text-muted-foreground/70 bg-secondary/50 px-3 py-1 rounded-full font-sans">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </header>

                <article className="font-serif">
                    <MDXRemote source={entry.content} components={components} />
                </article>

                {/* Enhancements (Music & Prompts) */}
                <div className="mt-16 space-y-4">
                    {entry.frontmatter.music?.track_uri && (
                        <SpotifyEmbed
                            trackUri={entry.frontmatter.music.track_uri}
                            caption={entry.frontmatter.music.caption}
                        />
                    )}

                    {entry.frontmatter.reflection_prompts && (
                        <ReflectionPrompts prompts={entry.frontmatter.reflection_prompts} />
                    )}
                </div>
            </div>
        </main>
    );
}
