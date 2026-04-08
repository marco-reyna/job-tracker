import React from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  label?: string;
  error?: string;
}

export function Select({ label, error, options, id, className = "", ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-base font-medium text-ink">
          {label}
        </label>
      )}
      <select
        id={id}
        className={`bg-surface text-ink border rounded-md px-3 py-2 w-full text-base focus:outline-none focus:ring-2 focus:ring-primary ${error ? "border-error" : "border-accent"} ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm font-medium text-ink">{error}</p>}
    </div>
  );
}
