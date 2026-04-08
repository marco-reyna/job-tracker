import React from "react";

const variantClasses = {
  accent:  "bg-badge-blue/20 text-badge-blue",
  neutral: "bg-badge-green/20 text-badge-green",
  error:   "bg-error/20 text-error",
  primary: "bg-badge-purple/20 text-badge-purple",
};

interface BadgeProps {
  variant: keyof typeof variantClasses;
  children: React.ReactNode;
}

export function Badge({ variant, children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${variantClasses[variant]}`}
    >
      {children}
    </span>
  );
}
