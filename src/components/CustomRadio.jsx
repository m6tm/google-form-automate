import React from 'react';

function CustomRadio({ label, value, onChange, size = 'sm' }) {
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
          type="radio"
          checked={isChecked}
          onChange={handleChange}
          className="radio focus:radio-primary"
          name="custom-radio"
        />
      </label>
    </div>
  );
}

export default CustomRadio;
