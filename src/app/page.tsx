import { getAllEntries } from '@/lib/journal';
import Link from 'next/link';
import { format } from 'date-fns';

export default function Home() {
  const entries = getAllEntries();

  return (
    <main className="min-h-screen py-24 px-6 md:px-12 max-w-3xl mx-auto">
      <header className="mb-20 text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-serif italic text-foreground tracking-tight">
          Reflective Journal
        </h1>
        <p className="text-lg text-muted font-sans font-light tracking-wide">
          A quiet archive of thoughts.
        </p>
      </header>

      <div className="w-full space-y-12 relative before:absolute before:inset-0 before:w-px before:bg-gradient-to-b before:from-transparent before:via-border/50 before:to-transparent before:left-0 md:before:left-1/2 before:-translate-x-1/2 before:z-0">
        {entries.map((entry) => (
          <article key={entry.slug} className="relative z-10 group">
            <Link href={`/entry/${entry.slug}`} className="block bg-card p-6 md:p-8 hover:shadow-sm hover:scale-[1.01] hover:bg-white dark:hover:bg-neutral-900 border border-transparent hover:border-border/50 rounded-lg transition-all duration-500 ease-out">
              <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4 border-b border-border/30 pb-4">
                <h2 className="text-2xl font-serif text-foreground group-hover:text-primary transition-colors">
                  {/* Use date if title is missing, as per journal convention */}
                  {format(new Date(entry.frontmatter.date), 'EEEE, MMMM do')}
                </h2>
                <time className="text-sm font-sans text-muted font-medium mt-1 md:mt-0">
                  {format(new Date(entry.frontmatter.date), 'yyyy')}
                </time>
              </div>

              {entry.frontmatter.music?.caption && (
                <p className="text-sm font-sans text-muted italic mb-4">
                  Listening: {entry.frontmatter.music.caption}
                </p>
              )}

              <div className="flex gap-2 flex-wrap">
                {entry.frontmatter.tags?.map(tag => (
                  <span key={tag} className="text-xs font-sans px-2 py-0.5 rounded-full border border-border text-muted-foreground bg-accent/30">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          </article>
        ))}
        {entries.length === 0 && (
          <div className="text-center text-muted font-serif italic p-12 bg-accent/20 rounded-lg mix-blend-multiply dark:mix-blend-screen">
            The pages are empty.
          </div>
        )}
      </div>

      <Link
        href="/new"
        className="fixed bottom-8 right-8 w-14 h-14 bg-foreground text-background rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 z-50 group"
        aria-label="New Entry"
      >
        <span className="text-2xl font-light pb-1 group-hover:rotate-90 transition-transform duration-300">+</span>
      </Link>
    </main>
  );
}
