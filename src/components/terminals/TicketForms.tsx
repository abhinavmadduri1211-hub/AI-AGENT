"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { automatedTicketTriage } from '@/ai/flows/automated-ticket-triage-flow';

interface TicketFormProps {
  onResult: (result: any) => void;
  onLoading: (isLoading: boolean) => void;
}

export function TicketForm({ onResult, onLoading }: TicketFormProps) {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!content.trim() || isLoading) return;

    setIsLoading(true);
    onLoading(true);
    try {
      const result = await automatedTicketTriage({
        ticketContent: content
      });
      onResult(result);
      setContent('');
    } catch (error) {
      console.error("Execution failed:", error);
    } finally {
      setIsLoading(false);
      onLoading(false);
    }
  };

  return (
    <div className="p-6 bg-[#09090b] border-t border-white/5">
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <span className="text-primary font-bold shrink-0">$</span>
        <input
          ref={inputRef}
          type="text"
          placeholder={isLoading ? "SYSTEM_PROCESSING_PAYLOAD..." : "TRIAGE_INPUT > [ENTER TICKET CONTENT]"}
          className="flex-1 bg-transparent border-none focus:ring-0 outline-none font-code text-sm text-foreground placeholder:text-muted-foreground/30 uppercase tracking-widest"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isLoading}
          suppressHydrationWarning
        />
        {isLoading && <Loader2 className="h-4 w-4 text-primary animate-spin" />}
      </form>
      
      <div className="mt-4 flex flex-wrap gap-4 opacity-30 hover:opacity-100 transition-opacity">
        {[
          'fraud report',
          'refund request',
          'missing hackerank invite',
          'visa card otp issue',
          'claude api 401 error'
        ].map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => {
              setContent(preset);
              inputRef.current?.focus();
            }}
            className="text-[10px] font-code uppercase tracking-tighter hover:text-primary transition-colors"
            suppressHydrationWarning
          >
            [ {preset} ]
          </button>
        ))}
      </div>
    </div>
  );
}
