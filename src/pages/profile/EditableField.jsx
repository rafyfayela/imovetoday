import { useState, useEffect } from "react";
import styles from "./Profile.module.css";

const EditableField = ({ label, value, editable = false, onValueChange }) => {
  const [fieldValue, setFieldValue] = useState(value);

  // Update internal state if the 'value' prop changes (e.g., after save or cancel)
  useEffect(() => {
    setFieldValue(value);
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setFieldValue(newValue);
    onValueChange && onValueChange(newValue); // Notify parent of change
  };

  // Keys to always display as formatted text, not editable inputs
  const alwaysTextDisplayKeys = ["full_name", "nationality", "Budget", "Workplace"]; // Example, adjust as needed

  const displayValue = fieldValue === null || fieldValue === undefined || fieldValue === "" ? "—" : fieldValue;
  const formattedLabel = label.replace(/_/g, " ");

  return (
    <div className={styles.editableField}>
      <span className={styles.fieldLabel}>{formattedLabel}:</span>
      {editable && !alwaysTextDisplayKeys.includes(label) ? (
        <input
          type="text"
          value={displayValue}
          onChange={handleChange}
          className={styles.editableInput}
        />
      ) : (
        <span className={styles.fieldValue}>{displayValue}</span>
      )}
    </div>
  );
};

export default EditableField;