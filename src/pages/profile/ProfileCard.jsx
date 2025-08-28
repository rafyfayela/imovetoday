import EditableField from "./EditableField";
import styles from "./Profile.module.css";
import { useState } from "react";

const ProfileCard = ({
  title,
  data,
  editable = false, 
  onEditToggle, // Function to toggle edit mode for this card
  onSave, // Function to save data for this card
  isMultiItem = false, // True if 'data' is an array of objects (e.g., Children)
  originalData = [], // Only used if isMultiItem is true, to pass original items to onSave
  customRender, // Optional: function to render multi-item data differently
  excludedKeys = [], // Keys to always exclude from display (even in edit mode for children internal IDs)
}) => {
  // State to hold pending changes for this card
  const [pendingChanges, setPendingChanges] = useState({});

  const handleFieldChange = (key, value, itemId = null) => {
    setPendingChanges((prev) => {
      if (itemId !== null) {
        // For multi-item cards (children)
        return {
          ...prev,
          [itemId]: {
            ...(prev[itemId] || {}),
            [key]: value,
          },
        };
      } else {
        // For single-item cards (user, preferences)
        return {
          ...prev,
          [key]: value,
        };
      }
    });
  };

  const handleSaveClick = async () => {
    if (isMultiItem) {
      // For children, iterate through pendingChanges for each child
      for (const itemId in pendingChanges) {
        const itemChanges = pendingChanges[itemId];
        const originalItem = originalData.find(item => item.id === parseInt(itemId));
        if (originalItem) {
          await onSave(itemChanges, originalItem); // Pass original item for context (e.g., ID)
        }
      }
    } else {
      // For single item cards, pass all pending changes
      await onSave(pendingChanges);
    }
    setPendingChanges({}); // Clear pending changes after saving
    onEditToggle(); // Exit edit mode
  };

  const handleCancelClick = () => {
    setPendingChanges({}); // Clear pending changes
    onEditToggle(); // Exit edit mode
  };

  const renderSingleItem = (itemData, isEditable, itemId = null) => {
    return Object.entries(itemData).map(([key, value]) => {
      // Skip internal IDs for display even in edit mode
      if (excludedKeys.includes(key)) {
        return null;
      }
      return (
        <EditableField
          key={key}
          label={key}
          value={pendingChanges[itemId]?.[key] !== undefined ? pendingChanges[itemId][key] : pendingChanges[key] !== undefined ? pendingChanges[key] : value}
          editable={isEditable}
          onValueChange={(newValue) => handleFieldChange(key, newValue, itemId)}
        />
      );
    });
  };

  return (
    <div className={styles.profileCard}>
      <div className={styles.cardHeader}>
        <h2 className={styles.cardTitle}>{title}</h2>
        {editable && (
          <div className={styles.cardActions}>
  {!editable && onEditToggle && (
    <button onClick={onEditToggle} className={styles.editButton}>
      Edit
    </button>
  )}
  {editable && (
    <>
      <button onClick={handleSaveClick} className={styles.saveButton}>
        Save
      </button>
      <button onClick={handleCancelClick} className={styles.cancelButton}>
        Cancel
      </button>
    </>
  )}
</div>

        )}
      </div>

      <div className={styles.cardContent}>
        {isMultiItem ? (
          data.map((item, idx) => (
            <div key={item.id || idx} className={styles.cardItem}>
              {editable ? (
                renderSingleItem(item, editable, item.id)
              ) : (
                customRender ? (
                  customRender(item)
                ) : (
                  Object.entries(item).map(([key, value]) => {
                    if (excludedKeys.includes(key)) return null;
                    return (
                      <EditableField
                        key={key}
                        label={key}
                        value={value}
                        editable={false} // Not editable in view mode
                      />
                    );
                  })
                )
              )}
            </div>
          ))
        ) : (
          <div className={styles.cardItem}>
            {renderSingleItem(data, editable)}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;