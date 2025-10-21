import React, { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  RefreshCw,
  Save,
  Download,
  Upload,
  RotateCcw,
} from "lucide-react";
import CustomInput from "./CustomInput";
import CustomSelect from "./CustomSelect";
import CustomButton from "./CustomButton";
import CBuilder from "./CBuilder";
import { useForm, Controller } from "react-hook-form";

function RepeaterForm() {
  const [fields, setFields] = useState([
    { id: 1, name: "", value: "", type: "text" },
  ]);
  const [isMounting, setIsmounting] = useState(true);
  const { control, handleSubmit } = useForm();

  const addField = () => {
    const newId = Math.max(...fields.map((f) => f.id)) + 1;
    setFields([...fields, { id: newId, name: "", value: "", type: "text" }]);
  };

  const removeField = (id) => {
    if (fields.length > 1) {
      setFields(fields.filter((f) => f.id !== id));
    }
  };

  const updateField = (id, key, value) => {
    setFields(fields.map((f) => (f.id === id ? { ...f, [key]: value } : f)));
  };

  const resetFields = () => {
    setFields([{ id: 1, name: "", value: "", type: "text" }]);
  };

  useEffect(() => {
    if (isMounting)
      chrome.storage.sync.get("formData", (result) => {
        console.log("résultat:", result);
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          return;
        }
        if (!result["formData"]) {
          console.log("No form data found in storage.");
          return;
        }
        setFields(result["formData"]);
        setIsmounting(false);
      });
  }, [isMounting]);

  const fillForm = (_formData) => {
    console.log("Fields state:", fields);
    chrome.storage.sync.set({ formData: fields }, () => {
      console.log("Form data saved to Chrome storage");
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
          const url = tabs[0].url;
          if (url && url.includes("docs.google.com/forms")) {
            chrome.tabs.sendMessage(
              tabs[0].id,
              { action: "fillForm" },
              (response) => {
                if (chrome.runtime.lastError) {
                  console.error(chrome.runtime.lastError);
                } else {
                  console.log("Form filling initiated:", response);
                }
              }
            );
          } else {
            alert(
              "Veuillez naviguer vers un formulaire Google Forms pour utiliser cette fonctionnalité."
            );
          }
        }
      });
    });
  };

  const fieldTypes = [
    { value: "text", label: "Texte" },
    { value: "date", label: "Date" },
    { value: "time", label: "Heure" },
    { value: "email", label: "Email" },
    { value: "number", label: "Nombre" },
    { value: "checkbox", label: "Case à cocher" },
    { value: "radio", label: "Bouton radio" },
    // { value: "select", label: "Sélection" },
    { value: "textarea", label: "Zone de texte" },
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
      <form onSubmit={handleSubmit(fillForm)}>
        {fields.map((field) => (
          <div
            key={field.id}
            className="bg-white p-4 border border-gray-300 rounded"
          >
            <div className="items-end gap-4 grid grid-cols-4">
              <Controller
                name={`name-${field.id}`}
                control={control}
                render={({ field: inputField }) => (
                  <CustomInput
                    {...inputField}
                    onChange={(e) => {
                      inputField.onChange(e);
                      updateField(field.id, "name", e.target.value);
                    }}
                    label="Nom"
                    placeholder="Entrez le label"
                  />
                )}
              />
              {!["checkbox", "radio", "textarea"].includes(field.type) ? (
                <CBuilder
                  type={field.type}
                  label="Valeur"
                  value={field.value}
                  onChange={(e) =>
                    updateField(field.id, "value", e.target.value)
                  }
                  placeholder="Entrez la valeur"
                />
              ) : null}
              <Controller
                name={`type-${field.id}`}
                control={control}
                render={({ field: selectField }) => (
                  <CustomSelect
                    {...selectField}
                    onChange={(e) => {
                      selectField.onChange(e);
                      updateField(field.id, "type", e.target.value);
                    }}
                    label="Type"
                    options={fieldTypes}
                  />
                )}
              />
              <CustomButton
                type="button"
                onClick={() => removeField(field.id)}
                disabled={fields.length === 1}
                variant="error"
              >
                <Trash2 className="w-4 h-4" />
              </CustomButton>
            </div>
            {["checkbox", "radio", "textarea"].includes(field.type) ? (
              <CBuilder
                type={field.type}
                label="Valeur"
                value={field.value}
                onChange={(e) => updateField(field.id, "value", e.target.value)}
                placeholder="Entrez la valeur"
              />
            ) : null}
          </div>
        ))}
        <div className="flex gap-3 space-x-2 mt-3">
          <CustomButton type="button" onClick={addField} variant="success">
            <Plus className="mr-2 w-4 h-4" />
            Ajouter un champ
          </CustomButton>
          <CustomButton type="submit" variant="success">
            <Plus className="mr-2 w-4 h-4" />
            Remplir le formulaire
          </CustomButton>
        </div>
      </form>
    </div>
  );
}

export default RepeaterForm;
