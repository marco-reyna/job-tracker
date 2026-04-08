import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, id, className = "", ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-base font-medium text-ink">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`bg-surface text-ink border rounded-md px-3 py-2 w-full text-base focus:outline-none focus:ring-2 focus:ring-primary ${error ? "border-error" : "border-accent"} ${className}`}
        {...props}
      />
      {error && <p className="text-sm font-medium text-ink">{error}</p>}
    </div>
  );
}
