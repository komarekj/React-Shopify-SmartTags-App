import { useState, useCallback } from 'react';

const useFormValidation = (formData, formRules) => {
  const [validationErrors, setValidationErrors] = useState({});

  /**
   * Form validation
   */
  const validateField = useCallback((value, rules) => {
    const { required, pattern } = rules;

    if (required && !value) {
      return { isValid: false, error: 'required' };
    }

    if (pattern && !pattern.test(value)) {
      return { isValid: false, error: 'not valid' };
    }

    return { isValid: true };
  }, []);

  const validateSimpleField = useCallback((field, rules) => {
    const value = formData[field];
    return validateField(value, rules);
  }, [formData, validateField]);

  const validateListField = useCallback((listField, rules) => {
    const [list, field] = listField.split('.');
    const listData = formData[list];
    let hasListError = false;
    const listErrors = {};

    if (listData) {
      listData.forEach((item, index) => {
        const value = item[field];
        const { isValid, error } = validateField(value, rules);

        if (!isValid) {
          hasListError = true;
          listErrors[`${list}.${index}.${field}`] = error;
        }
      });
    }

    return { listErrors, hasListError };
  }, [formData, validateField]);

  const validate = useCallback(() => {
    let errors = {};
    let vaildForm = true;

    Object.keys(formRules).forEach((field) => {
      const validationRules = formRules[field];

      if (field.includes('.')) {
        // List field
        const { listErrors, hasListError } = validateListField(field, validationRules);
        if (hasListError) {
          vaildForm = false;
          errors = { ...errors, ...listErrors };
        }
      } else {
        // Simple field
        const { isValid, error } = validateSimpleField(field, validationRules);
        if (!isValid) {
          vaildForm = false;
          errors[field] = error;
        }
      }
    });

    setValidationErrors(errors);
    return vaildForm;
  }, [formRules, validateListField, validateSimpleField]);

  return { errors: validationErrors, validate };
};

export default useFormValidation;
