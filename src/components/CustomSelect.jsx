import React from 'react';

function CustomSelect({ label, value, onChange, options, size = 'sm' }) {
  const sizeClasses = {
    xs: "select-xs",
    sm: "select-sm",
    md: "select-md",
    lg: "select-lg"
  };

  return (
    <div className="form-control">
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        className={`select select-bordered focus:select-primary ${sizeClasses[size]}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CustomSelect;
