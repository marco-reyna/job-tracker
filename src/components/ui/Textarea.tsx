import React from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, id, className = "", rows = 4, ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-base font-medium text-ink">
          {label}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        className={`bg-surface text-ink border rounded-md px-3 py-2 w-full text-base focus:outline-none focus:ring-2 focus:ring-primary resize-y ${error ? "border-error" : "border-accent"} ${className}`}
        {...props}
      />
      {error && <p className="text-sm font-medium text-ink">{error}</p>}
    </div>
  );
}
