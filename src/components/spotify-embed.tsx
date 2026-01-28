"use client"

import React from 'react';

interface SpotifyEmbedProps {
    trackUri: string;
    caption?: string;
}

export function SpotifyEmbed({ trackUri, caption }: SpotifyEmbedProps) {
    // Extract ID from spotify:track:ID or https://open.spotify.com/track/ID
    const trackId = trackUri.split(':').pop()?.split('/').pop();

    if (!trackId) return null;

    return (
        <div className="my-10 p-1 md:p-2 bg-white dark:bg-neutral-800/50 rounded-xl shadow-sm border border-border/40 max-w-md mx-auto transition-all hover:shadow-md">
            <iframe
                src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`}
                width="100%"
                height="80"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-[10px] opacity-95 hover:opacity-100 transition-opacity"
            />
            {caption && (
                <div className="mt-2 px-2 pb-1 text-center">
                    <p className="text-xs font-serif italic text-muted-foreground/80">
                        {caption}
                    </p>
                </div>
            )}
        </div>
    );
}
