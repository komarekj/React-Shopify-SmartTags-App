import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  InlineError,
} from '@shopify/polaris';
import FormField from '../FormField';
import matchTypes from './conditionMatchTypes';

const ConditionMatchType = ({ error, fieldId, handleMatchChange }) => (
  <Card
    title="Match Type"
    sectioned
  >
    {matchTypes.map((matchType) => (
      <FormField
        key={matchType.id}
        fieldType="radioButton"
        name={matchType.name}
        id={fieldId}
        radioId={matchType.id}
        helpText={matchType.helpText}
        onChange={handleMatchChange}
      />
    ))}
    {error && (
      <InlineError
        message={`Match Type is ${error}`}
        fieldID={fieldId}
      />
    )}
  </Card>
);

ConditionMatchType.propTypes = {
  error: PropTypes.string,
  fieldId: PropTypes.string.isRequired,
  handleMatchChange: PropTypes.func.isRequired,
};

ConditionMatchType.defaultProps = {
  error: null,
};

export default ConditionMatchType;
