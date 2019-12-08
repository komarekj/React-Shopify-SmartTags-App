import { useState, useCallback } from 'react';
import useFormValidation from './useFormValidation';

const useForm = (initialState, validationRules) => {
  const [data, setData] = useState(initialState);
  const { errors, validate } = useFormValidation(data, validationRules);

  const getField = useCallback((id) => {
    const isListField = id.includes('.');

    let value;
    if (isListField) {
      const [list, listIndex, fieldId] = id.split('.');
      value = data[list][listIndex][fieldId];
    } else {
      value = data[id];
    }

    const error = errors[id];

    return { value, error };
  }, [data, errors]);

  /**
   * Form Change Handlers
   */
  const handleFormChange = useCallback((value, id) => {
    setData((oldData) => (
      {
        ...oldData,
        [id]: value,
      }
    ));
  }, []);

  const handleListItemChange = useCallback((value, id) => {
    const [list, listIndex, fieldId] = id.split('.');

    setData((oldData) => {
      const newListItems = [...oldData[list]];
      newListItems[listIndex][fieldId] = value;

      return {
        ...oldData,
        [list]: newListItems,
      };
    });
  }, []);

  const handleNewListItem = useCallback((list) => {
    setData((oldData) => {
      const oldListItems = oldData[list] || [];

      return {
        ...oldData,
        [list]: [...oldListItems, {}],
      };
    });
  }, []);

  const handleRemoveListItem = useCallback((list, removeIndex) => {
    setData((oldData) => ({
      ...oldData,
      [list]: oldData[list].filter((item, index) => index !== removeIndex),
    }));
  }, []);

  return {
    data,
    setData,
    handleFormChange,
    handleListItemChange,
    handleNewListItem,
    handleRemoveListItem,
    errors,
    validate,
    getField,
  };
};

export default useForm;
