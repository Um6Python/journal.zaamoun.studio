'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { deleteEntry } from '@/app/actions';

export function DeleteButton({ slug }: { slug: string }) {
    const [status, setStatus] = useState<'idle' | 'confirm' | 'deleting'>('idle');

    const handleClick = async () => {
        if (status === 'idle') {
            setStatus('confirm');
            // Reset to idle after 3 seconds if not confirmed
            setTimeout(() => setStatus(prev => prev === 'confirm' ? 'idle' : prev), 3000);
            return;
        }

        if (status === 'confirm') {
            setStatus('deleting');
            try {
                await deleteEntry(slug);
            } catch (e) {
                console.error(e);
                alert("Failed to delete entry");
                setStatus('idle');
            }
        }
    };

    return (
        <button
            onClick={handleClick}
            disabled={status === 'deleting'}
            className={`
                group flex items-center gap-2 text-xs uppercase tracking-widest transition-all duration-300 font-sans px-4 py-2 rounded-full
                ${status === 'confirm'
                    ? 'bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400'
                    : 'text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10'
                }
            `}
        >
            <Trash2 size={12} className={status === 'confirm' ? "animate-pulse" : ""} />
            {status === 'idle' && "Delete Entry"}
            {status === 'confirm' && "Confirm?"}
            {status === 'deleting' && "Deleting..."}
        </button>
    );
}
