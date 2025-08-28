import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MultiStepForm.module.css';

const MultiStepForm = ({ closeModal }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nationality: '',
    family_size: '',
    conjoint: false,
    nameWork: '',
    city: '',
    industry: '',
    location: { latitude: '', longitude: '' },
    budget_min: '',
    budget_max: '',
    car: false,
    children: [],
  });
  const [errors, setErrors] = useState({});

  /** Validate current step */
  const validateStep = () => {
    let currentErrors = {};
    let isValid = true;

    if (step === 1) {
      if (!formData.nationality.trim()) {
        currentErrors.nationality = 'Nationality is required';
        isValid = false;
      }
      if (!formData.family_size || Number(formData.family_size) < 1) {
        currentErrors.family_size = 'Family size must be at least 1';
        isValid = false;
      }
    }

    if (step === 2) {
      if (!formData.nameWork.trim()) {
        currentErrors.nameWork = 'Occupation is required';
        isValid = false;
      }
      if (!formData.city.trim()) {
        currentErrors.city = 'City is required';
        isValid = false;
      }
    }

    if (step === 3) {
      if (!formData.budget_min || Number(formData.budget_min) < 0) {
        currentErrors.budget_min = 'Minimum budget is required';
        isValid = false;
      }
      if (!formData.budget_max || Number(formData.budget_max) < 0) {
        currentErrors.budget_max = 'Maximum budget is required';
        isValid = false;
      }
    }

    if (step === 4) {
      formData.children.forEach((child, index) => {
        if (!child.fullName?.trim()) {
          currentErrors[`child_${index}_fullName`] = 'Full Name is required';
          isValid = false;
        }
        if (!child.age || Number(child.age) <= 0) {
          currentErrors[`child_${index}_age`] = 'Age must be positive';
          isValid = false;
        }
      });
    }

    setErrors(currentErrors);
    return isValid;
  };

  /** Input change handler */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'latitude' || name === 'longitude') {
      setFormData((prev) => ({
        ...prev,
        location: { ...prev.location, [name]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }

    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  /** Child input change */
  const handleChildChange = (index, e) => {
    const { name, value } = e.target;
    const updatedChildren = [...formData.children];
    updatedChildren[index] = { ...updatedChildren[index], [name]: value };
    setFormData((prev) => ({ ...prev, children: updatedChildren }));
    setErrors((prev) => ({ ...prev, [`child_${index}_${name}`]: '' }));
  };

  /** Add new child respecting family rules */
  const addChild = () => {
    const familySizeNum = Number(formData.family_size);
    if (isNaN(familySizeNum) || familySizeNum < 1) {
      alert('Please enter a valid family size first.');
      return;
    }
    const maxChildren = formData.conjoint ? familySizeNum - 2 : familySizeNum - 1;

    if (formData.children.length < maxChildren) {
      setFormData((prev) => ({
        ...prev,
        children: [
          ...prev.children,
          { fullName: '', age: '', currentGrade: '', educationStage: '', preferredCurriculum: '' },
        ],
      }));
    } else {
      alert(`You can add a maximum of ${maxChildren} children.`);
    }
  };

  /** Step navigation */
  const nextStep = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
      setErrors({});
    }
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
    setErrors({});
  };

  /** Final submit */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep()) return;
    // console.log("Final Form Data:", formData);
    navigate('/criteria', { state: { formData } });
    closeModal();
  };

  /** Render step UI */
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className={styles.formStep}>
            <h3>Complete your information</h3>
            <input
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              placeholder="Nationality"
              className={errors.nationality ? styles.inputError : ''}
            />
            {errors.nationality && <span className={styles.errorText}>{errors.nationality}</span>}

            <input
              name="family_size"
              type="number"
              min="1"
              value={formData.family_size}
              onChange={handleChange}
              placeholder="Family Size"
              className={errors.family_size ? styles.inputError : ''}
            />
            {errors.family_size && <span className={styles.errorText}>{errors.family_size}</span>}

            <label className={styles.checkboxLabel}>
              <input
                name="conjoint"
                type="checkbox"
                checked={formData.conjoint}
                onChange={handleChange}
              />
              Are you relocating with a conjoint?
            </label>

            <div className={styles.buttonGroup}>
              <button type="button" onClick={nextStep} className={styles.formButton}>
                Next
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className={styles.formStep}>
            <h3>Work Information</h3>
            <input
              name="nameWork"
              value={formData.nameWork}
              onChange={handleChange}
              placeholder="Occupation / Job Title"
            />
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Work City"
            />
            <input
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              placeholder="Industry"
            />
            <input
              name="latitude"
              type="number"
              value={formData.location.latitude}
              onChange={handleChange}
              placeholder="Latitude"
            />
            <input
              name="longitude"
              type="number"
              value={formData.location.longitude}
              onChange={handleChange}
              placeholder="Longitude"
            />

            <div className={styles.buttonGroup}>
              <button
                type="button"
                onClick={prevStep}
                className={`${styles.formButton} ${styles.backButton}`}
              >
                Back
              </button>
              <button type="button" onClick={nextStep} className={styles.formButton}>
                Next
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className={styles.formStep}>
            <h3>Financial & Lifestyle</h3>
            <input
              name="budget_min"
              type="number"
              value={formData.budget_min}
              onChange={handleChange}
              placeholder="Minimum Budget"
            />
            <input
              name="budget_max"
              type="number"
              value={formData.budget_max}
              onChange={handleChange}
              placeholder="Maximum Budget"
            />

            <label className={styles.checkboxLabel}>
              <input name="car" type="checkbox" checked={formData.car} onChange={handleChange} />
              Will you own a car?
            </label>

            <div className={styles.buttonGroup}>
              <button
                type="button"
                onClick={prevStep}
                className={`${styles.formButton} ${styles.backButton}`}
              >
                Back
              </button>
              <button type="button" onClick={nextStep} className={styles.formButton}>
                Next
              </button>
            </div>
          </div>
        );

      case 4:
        const maxChildren = formData.conjoint
          ? Number(formData.family_size) - 2
          : Number(formData.family_size) - 1;
        const canAddMoreChildren = formData.children.length < maxChildren;

        return (
          <div className={styles.formStep}>
            <h3>Children Details</h3>
            {formData.children.map((child, idx) => (
              <div key={idx} className={styles.childForm}>
                <h4>Child {idx + 1}</h4>
                <input
                  name="fullName"
                  value={child.fullName}
                  onChange={(e) => handleChildChange(idx, e)}
                  placeholder="Full Name"
                  className={errors[`child_${idx}_fullName`] ? styles.inputError : ''}
                />
                {errors[`child_${idx}_fullName`] && (
                  <span className={styles.errorText}>{errors[`child_${idx}_fullName`]}</span>
                )}

                <input
                  name="age"
                  type="number"
                  value={child.age}
                  onChange={(e) => handleChildChange(idx, e)}
                  placeholder="Age"
                  className={errors[`child_${idx}_age`] ? styles.inputError : ''}
                />
                {errors[`child_${idx}_age`] && (
                  <span className={styles.errorText}>{errors[`child_${idx}_age`]}</span>
                )}

                <input
                  name="currentGrade"
                  value={child.currentGrade}
                  onChange={(e) => handleChildChange(idx, e)}
                  placeholder="Current Grade"
                />
                <input
                  name="educationStage"
                  value={child.educationStage}
                  onChange={(e) => handleChildChange(idx, e)}
                  placeholder="Education Stage"
                />
                <input
                  name="preferredCurriculum"
                  value={child.preferredCurriculum}
                  onChange={(e) => handleChildChange(idx, e)}
                  placeholder="Preferred Curriculum"
                />
              </div>
            ))}

            {canAddMoreChildren && (
              <button
                type="button"
                onClick={addChild}
                className={`${styles.formButton} ${styles.addChildButton}`}
              >
                Add Another Child
              </button>
            )}

            <div className={styles.buttonGroup}>
              <button
                type="button"
                onClick={prevStep}
                className={`${styles.formButton} ${styles.backButton}`}
              >
                Back
              </button>
              <button type="submit" className={styles.formButton}>
                Submit
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.modalBackdrop} onClick={closeModal}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button onClick={closeModal} className={styles.closeModalButton}>
          &times;
        </button>
        <form onSubmit={handleSubmit} className={styles.multiStepForm}>
          {renderStep()}
        </form>
      </div>
    </div>
  );
};

export default MultiStepForm;
