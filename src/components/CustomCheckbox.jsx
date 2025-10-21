import React from 'react';

function CustomCheckbox({ label, value, onChange, size = 'sm' }) {
  const isChecked = value === 'true';

  const handleChange = (e) => {
    const newValue = e.target.checked ? 'true' : 'false';
    onChange({ target: { value: newValue } });
  };

  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <span className="label-text">{label}</span>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          className="checkbox focus:checkbox-primary"
        />
      </label>
    </div>
  );
}

export default CustomCheckbox;
