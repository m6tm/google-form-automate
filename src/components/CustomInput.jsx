import React from 'react';

function CustomInput({ label, value, onChange, placeholder, type = 'text', size = 'sm' }) {
  const sizeClasses = {
    xs: "input-xs",
    sm: "input-sm",
    md: "input-md",
    lg: "input-lg"
  };

  return (
    <div className="form-control">
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input input-bordered focus:input-primary ${sizeClasses[size]}`}
      />
    </div>
  );
}

export default CustomInput;
