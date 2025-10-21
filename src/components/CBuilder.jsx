import React from "react";
import CustomInput from "./CustomInput";
import CustomSelect from "./CustomSelect";
import CustomTextarea from "./CustomTextarea";

export default function CBuilder({
  type,
  label,
  value,
  onChange,
  placeholder,
  ...props
}) {
  const defaultSelectOptions = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  switch (type) {
    case "text":
      return (
        <CustomInput
          label={label}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type="text"
          {...props}
        />
      );
    case "date":
      return (
        <CustomInput
          label={label}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type="date"
          {...props}
        />
      );
    case "time":
      return (
        <CustomInput
          label={label}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type="time"
          {...props}
        />
      );
    case "email":
      return (
        <CustomInput
          label={label}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type="email"
          {...props}
        />
      );
    case "number":
      return (
        <CustomInput
          label={label}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type="number"
          {...props}
        />
      );
    case "checkbox":
      return (
        <CustomCheckboxField
          label={label}
          value={value}
          onChange={onChange}
          {...props}
        />
      );
    case "radio":
      return (
        <CustomRadioField
          label={label}
          value={value}
          onChange={onChange}
          {...props}
        />
      );
    case "select":
      return (
        <CustomSelect
          label={label}
          value={value}
          onChange={onChange}
          options={defaultSelectOptions}
          {...props}
        />
      );
    case "textarea":
      return (
        <CustomTextarea
          label={label}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          {...props}
        />
      );
    default:
      return (
        <CustomInput
          label={label}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type="text"
          {...props}
        />
      );
  }
}

function CustomCheckboxField({ label, value, onChange, ...props }) {
  const [items, setItems] = React.useState([{ id: 1, cle: "" }]);
  const [lastItem, setLastItem] = React.useState({ cle: "", valeur: "" });
  const isMountedRef = React.useRef(true);
  const timeoutRef = React.useRef(null);

  React.useEffect(() => {
    if (value && typeof value === "string") {
      try {
        const parsed = JSON.parse(value);
        if (parsed.items && parsed.lastItem) {
          setItems(parsed.items);
          setLastItem(parsed.lastItem);
        }
      } catch (e) {
        // ignore invalid JSON
      }
    }
  }, [value]);

  React.useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const addItem = () => {
    const newId = Math.max(...items.map((i) => i.id), 0) + 1;
    setItems([...items, { id: newId, cle: "" }]);
  };

  const updateItem = (id, field, val) => {
    setItems(items.map((i) => (i.id === id ? { ...i, [field]: val } : i)));
  };

  const removeItem = (id) => {
    if (items.length > 1) {
      setItems(items.filter((i) => i.id !== id));
    }
  };

  const updateLast = (field, val) => {
    setLastItem({ ...lastItem, [field]: val });
  };

  // Update parent on changes
  React.useEffect(() => {
    if (isMountedRef.current && onChange) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        const fullValue = { items, lastItem };
        onChange({ target: { value: JSON.stringify(fullValue) } });
      }, 300);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [items, lastItem, onChange]);

  return (
    <div className="form-control">
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            <CustomInput
              value={item.cle}
              onChange={(e) => updateItem(item.id, "cle", e.target.value)}
              placeholder="Case à cocher"
            />
            <button
              onClick={() => removeItem(item.id)}
              className="btn btn-sm btn-error"
              disabled={items.length === 1}
            >
              Supprimer
            </button>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <CustomInput
            value={lastItem.cle}
            onChange={(e) => updateLast("cle", e.target.value)}
            placeholder="Case Autre"
          />
          <CustomInput
            value={lastItem.valeur}
            onChange={(e) => updateLast("valeur", e.target.value)}
            placeholder="Valeur de la case autre"
          />
        </div>
        <button onClick={addItem} className="btn btn-sm btn-primary">
          Ajouter un item
        </button>
      </div>
    </div>
  );
}

function CustomRadioField({ label, value, onChange, ...props }) {
  const [option, setOption] = React.useState("");
  const [otherOption, setOtherOption] = React.useState("");
  const [otherValue, setOtherValue] = React.useState("");
  const isMountedRef = React.useRef(true);
  const timeoutRef = React.useRef(null);

  React.useEffect(() => {
    if (value && typeof value === "string") {
      try {
        const parsed = JSON.parse(value);
        if (parsed.option !== undefined && parsed.otherOption !== undefined && parsed.otherValue !== undefined) {
          setOption(parsed.option);
          setOtherOption(parsed.otherOption);
          setOtherValue(parsed.otherValue);
        }
      } catch (e) {
        // ignore invalid JSON
      }
    }
  }, [value]);

  React.useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const isOptionFilled = option.trim() !== "";
  const isOtherFilled = otherOption.trim() !== "" || otherValue.trim() !== "";

  const handleOptionChange = (e) => {
    const val = e.target.value;
    setOption(val);
    if (val.trim() !== "" && isOtherFilled) {
      setOtherOption("");
      setOtherValue("");
    }
  };

  const handleOtherOptionChange = (e) => {
    const val = e.target.value;
    setOtherOption(val);
    if (val.trim() !== "" && isOptionFilled) {
      setOption("");
    }
  };

  const handleOtherValueChange = (e) => {
    const val = e.target.value;
    setOtherValue(val);
    if (val.trim() !== "" && isOptionFilled) {
      setOption("");
    }
  };

  // Update parent on changes
  React.useEffect(() => {
    if (isMountedRef.current && onChange) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        const fullValue = { option, otherOption, otherValue };
        onChange({ target: { value: JSON.stringify(fullValue) } });
      }, 300);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [option, otherOption, otherValue, onChange]);

  return (
    <div className="form-control">
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <div className="space-y-2">
        <CustomInput
          label="Option à cocher"
          value={option}
          onChange={handleOptionChange}
          placeholder="Entrez l'option sélectionnée"
          disabled={isOtherFilled}
        />
        <div className="flex items-end gap-2">
          <CustomInput
            label="Autre option"
            value={otherOption}
            onChange={handleOtherOptionChange}
            placeholder="Entrez l'autre option"
            disabled={isOptionFilled}
          />
          <CustomInput
            label="Valeur de l'option"
            value={otherValue}
            onChange={handleOtherValueChange}
            placeholder="Entrez la valeur"
            disabled={isOptionFilled}
          />
        </div>
      </div>
    </div>
  );
}
