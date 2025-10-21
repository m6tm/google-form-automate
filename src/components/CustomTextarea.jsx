import React from 'react';

function CustomTextarea({ label, value, onChange, placeholder, size = 'sm' }) {
  const sizeClasses = {
    xs: "textarea-xs",
    sm: "textarea-sm",
    md: "textarea-md",
    lg: "textarea-lg"
  };

  return (
    <div className="form-control">
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`textarea textarea-bordered focus:textarea-primary ${sizeClasses[size]}`}
      />
    </div>
  );
}

export default CustomTextarea;
