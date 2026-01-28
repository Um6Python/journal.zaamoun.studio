"use client"
import { useState } from 'react';
import { Sparkles } from 'lucide-react';

export function ReflectionPrompts({ prompts }: { prompts: string[] }) {
    const [isOpen, setIsOpen] = useState(false);

    if (!prompts || prompts.length === 0) return null;

    return (
        <aside className="my-16 border-t border-border/40 pt-10 flex flex-col items-center">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="group flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all duration-300 font-sans px-4 py-2 rounded-full hover:bg-accent/50"
                aria-expanded={isOpen}
            >
                <Sparkles size={12} className={`transition-colors duration-500 ${isOpen ? "text-yellow-500/80" : "text-muted-foreground/50 group-hover:text-yellow-500/50"}`} />
                {isOpen ? "Close Reflection" : "View Reflection Prompts"}
            </button>

            <div className={`grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "grid-rows-[1fr] opacity-100 mt-8" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden min-w-[300px] max-w-prose text-center">
                    <div className="bg-accent/10 dark:bg-accent/5 p-8 rounded-2xl border border-accent/20 space-y-6">
                        {prompts.map((prompt, i) => (
                            <p key={i} className="font-serif text-lg md:text-xl text-foreground/80 leading-relaxed">
                                {prompt}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
}
