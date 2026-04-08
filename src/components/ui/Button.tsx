"use client";

import React from "react";

const variantClasses = {
  primary: "bg-primary hover:bg-primary/90 text-ink",
  secondary: "bg-fg hover:bg-accent text-ink border border-accent",
  danger: "bg-error hover:bg-error/90 text-ink",
};

const sizeClasses = {
  sm: "px-3 py-1.5 text-base",
  md: "px-4 py-2 text-base",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variantClasses;
  size?: keyof typeof sizeClasses;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
