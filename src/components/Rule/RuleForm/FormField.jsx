/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Select, TextField, RadioButton } from '@shopify/polaris';
import FormContext from './FormContext';

const FormField = (props) => {
  const {
    fieldType,
    name,
    id,
    radioId,
    ...otherProps
  } = props;

  const form = useContext(FormContext);

  const { value, error } = useMemo(() => (
    form.getField(id)
  ), [form, id]);

  const errorMsg = useMemo(() => (
    error ? `${name} is ${error}` : null
  ), [error, name]);

  switch (fieldType) {
    case 'select':
      return (
        <Select
          label={name}
          id={id}
          value={value}
          error={errorMsg}
          onChange={form.handleFormChange}
          {...otherProps}
        />
      );
    case 'radioButton':
      return (
        <RadioButton
          label={name}
          name={id}
          id={radioId}
          value={radioId}
          checked={value === radioId}
          error={errorMsg}
          onChange={form.handleFormChange}
          {...otherProps}
        />
      );
    default:
      return (
        <TextField
          label={name}
          id={id}
          value={value}
          error={errorMsg}
          onChange={form.handleFormChange}
          {...otherProps}
        />
      );
  }
};

FormField.propTypes = {
  fieldType: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  radioId: PropTypes.string,
};

FormField.defaultProps = {
  radioId: null,
  fieldType: 'text',
};

export default FormField;
