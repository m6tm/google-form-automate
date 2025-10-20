import React, { useState } from 'react';
import { Plus, Trash2, RefreshCw, Save, Download, Upload, RotateCcw } from 'lucide-react';
import CustomInput from './CustomInput';
import CustomSelect from './CustomSelect';
import CustomButton from './CustomButton';

function RepeaterForm() {
  const [fields, setFields] = useState([
    { id: 1, name: '', value: '', type: 'text' }
  ]);

  const addField = () => {
    const newId = Math.max(...fields.map(f => f.id)) + 1;
    setFields([...fields, { id: newId, name: '', value: '', type: 'text' }]);
  };

  const removeField = (id) => {
    if (fields.length > 1) {
      setFields(fields.filter(f => f.id !== id));
    }
  };

  const updateField = (id, key, value) => {
    setFields(fields.map(f => f.id === id ? { ...f, [key]: value } : f));
  };

  const resetFields = () => {
    setFields([{ id: 1, name: '', value: '', type: 'text' }]);
  };

  const fieldTypes = [
    { value: 'text', label: 'Texte' },
    { value: 'email', label: 'Email' },
    { value: 'number', label: 'Nombre' },
    { value: 'checkbox', label: 'Case à cocher' },
    { value: 'radio', label: 'Bouton radio' },
    { value: 'select', label: 'Sélection' },
    { value: 'textarea', label: 'Zone de texte' }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-end space-x-2">
        <CustomButton variant="ghost" size="sm" onClick={() => {}}>
          <RefreshCw className="w-4 h-4" />
        </CustomButton>
        <CustomButton variant="ghost" size="sm" onClick={() => {}}>
          <Save className="w-4 h-4" />
        </CustomButton>
        <CustomButton variant="ghost" size="sm" onClick={() => {}}>
          <Download className="w-4 h-4" />
        </CustomButton>
        <CustomButton variant="ghost" size="sm" onClick={() => {}}>
          <Upload className="w-4 h-4" />
        </CustomButton>
        <CustomButton variant="ghost" size="sm" onClick={resetFields}>
          <RotateCcw className="w-4 h-4" />
        </CustomButton>
      </div>
      <h2 className="font-semibold text-lg">Configuration des champs</h2>
      {fields.map((field) => (
        <div key={field.id} className="bg-white p-4 border border-gray-300 rounded">
          <div className="items-end gap-4 grid grid-cols-4">
            <CustomInput
              label="Nom"
              value={field.name}
              onChange={(e) => updateField(field.id, 'name', e.target.value)}
              placeholder="Entrez le label"
            />
            <CustomInput
              label="Valeur"
              value={field.value}
              onChange={(e) => updateField(field.id, 'value', e.target.value)}
              placeholder="Entrez la valeur"
            />
            <CustomSelect
              label="Type"
              value={field.type}
              onChange={(e) => updateField(field.id, 'type', e.target.value)}
              options={fieldTypes}
            />
            <CustomButton
              onClick={() => removeField(field.id)}
              disabled={fields.length === 1}
              variant="error"
            >
              <Trash2 className="w-4 h-4" />
            </CustomButton>
          </div>
        </div>
      ))}
      <CustomButton
        onClick={addField}
        variant="success"
      >
        <Plus className="mr-2 w-4 h-4" />
        Ajouter un champ
      </CustomButton>
    </div>
  );
}

export default RepeaterForm;