import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { createEntry } from '../actions';

export default function NewEntryPage() {
    return (
        <main className="min-h-screen py-10 md:py-24 px-6 flex justify-center">
            <div className="max-w-2xl w-full">
                <Link href="/" className="inline-flex items-center text-sm text-muted hover:text-foreground transition-colors mb-8 font-sans group">
                    <ArrowLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" />
                    Cancel
                </Link>

                <header className="mb-10">
                    <h1 className="text-3xl md:text-4xl font-serif font-medium text-foreground">New Entry</h1>
                    <p className="text-muted font-sans mt-2">Take a breath. Write what feels true.</p>
                </header>

                <form action={createEntry} className="space-y-8">
                    {/* Metadata Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-secondary/20 rounded-xl border border-border/40">
                        <div className="space-y-2">
                            <label htmlFor="title" className="text-xs font-sans uppercase tracking-wider text-muted-foreground ml-1">Title (Optional)</label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                placeholder="Untitled Morning"
                                className="w-full bg-background border border-border rounded-md px-3 py-2 font-serif text-foreground focus:outline-hidden focus:ring-1 focus:ring-foreground/20 transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="mood" className="text-xs font-sans uppercase tracking-wider text-muted-foreground ml-1">Current Mood</label>
                            <input
                                type="text"
                                name="mood"
                                id="mood"
                                placeholder="e.g. Calm, Restless"
                                className="w-full bg-background border border-border rounded-md px-3 py-2 font-serif text-foreground focus:outline-hidden focus:ring-1 focus:ring-foreground/20 transition-all"
                            />
                        </div>

                        <div className="col-span-full space-y-2">
                            <label htmlFor="tags" className="text-xs font-sans uppercase tracking-wider text-muted-foreground ml-1">Tags (Comma separated)</label>
                            <input
                                type="text"
                                name="tags"
                                id="tags"
                                placeholder="clarity, morning-pages, rain"
                                className="w-full bg-background border border-border rounded-md px-3 py-2 font-sans text-sm text-foreground focus:outline-hidden focus:ring-1 focus:ring-foreground/20 transition-all"
                            />
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="space-y-2">
                        <label htmlFor="content" className="sr-only">Entry Content</label>
                        <textarea
                            name="content"
                            id="content"
                            required
                            placeholder="Start writing..."
                            className="w-full min-h-[400px] p-4 bg-transparent border-none resize-y font-serif text-lg leading-relaxed text-foreground placeholder:text-muted/30 focus:outline-hidden focus:ring-0"
                        ></textarea>
                    </div>

                    {/* Music Support (Optional) */}
                    <details className="group">
                        <summary className="list-none cursor-pointer flex items-center text-sm text-muted hover:text-foreground transition-colors font-sans">
                            <span className="mr-2 group-open:rotate-90 transition-transform">▸</span>
                            Add Music Context
                        </summary>
                        <div className="mt-4 p-6 bg-secondary/20 rounded-xl border border-border/40 grid grid-cols-1 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="track_uri" className="text-xs font-sans uppercase tracking-wider text-muted-foreground ml-1">Spotify Track Link / URI</label>
                                <input
                                    type="text"
                                    name="track_uri"
                                    id="track_uri"
                                    placeholder="https://open.spotify.com/track/..."
                                    className="w-full bg-background border border-border rounded-md px-3 py-2 font-sans text-sm text-foreground focus:outline-hidden focus:ring-1 focus:ring-foreground/20 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="caption" className="text-xs font-sans uppercase tracking-wider text-muted-foreground ml-1">Why this song?</label>
                                <input
                                    type="text"
                                    name="caption"
                                    id="caption"
                                    placeholder="Helps me focus..."
                                    className="w-full bg-background border border-border rounded-md px-3 py-2 font-serif text-foreground focus:outline-hidden focus:ring-1 focus:ring-foreground/20 transition-all"
                                />
                            </div>
                        </div>
                    </details>

                    <div className="pt-6 border-t border-border/40 flex justify-end">
                        <button
                            type="submit"
                            className="bg-foreground text-background px-8 py-3 rounded-full font-sans font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
                        >
                            Save Entry
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
