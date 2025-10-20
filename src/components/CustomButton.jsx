import React from 'react';

function CustomButton({ children, onClick, disabled = false, variant = 'primary', size = 'sm', className = '' }) {
  const baseClasses = "btn";
  const sizeClasses = {
    xs: "btn-xs",
    sm: "btn-sm",
    md: "btn-md",
    lg: "btn-lg"
  };
  const variantClasses = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    accent: "btn-accent",
    success: "btn-success",
    warning: "btn-warning",
    error: "btn-error",
    ghost: "btn-ghost",
    outline: "btn-outline"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className} ${disabled ? 'btn-disabled' : ''}`}
    >
      {children}
    </button>
  );
}

export default CustomButton;
