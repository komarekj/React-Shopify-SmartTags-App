import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Stack,
  FormLayout,
  Button,
  Icon,
} from '@shopify/polaris';
import { DeleteMinor } from '@shopify/polaris-icons';
import FormField from '../FormField';
import conditionOperators from './conditionOperators';

const ConditionItem = (props) => {
  const {
    fieldListId,
    variables,
    index,
    disableRemove,
    handleListItemChange,
    handleRemoveListItem,
  } = props;

  const getFieldId = useCallback((key) => (
    `${fieldListId}.${index}.${key}`
  ), [fieldListId, index]);

  return (
    <Card.Section>
      <Stack wrap={false}>
        <Stack.Item fill>
          <FormLayout>
            <FormLayout.Group condensed>
              <FormField
                name="Variable"
                id={getFieldId('variable')}
                fieldType="select"
                options={variables}
                onChange={(value, id) => handleListItemChange(value, id, index)}
              />
              <FormField
                name="Operator"
                id={getFieldId('operator')}
                fieldType="select"
                options={conditionOperators}
                onChange={(value, id) => handleListItemChange(value, id, index)}
              />
              <FormField
                name="Value"
                id={getFieldId('value')}
                onChange={(value, id) => handleListItemChange(value, id, index)}
              />
            </FormLayout.Group>
          </FormLayout>
        </Stack.Item>
        <Stack.Item>
          <div className="rule-form__condition-remove-btn">
            <Button
              onClick={() => handleRemoveListItem(index)}
              disabled={disableRemove}
              destructive
            >
              <Icon source={DeleteMinor} />
            </Button>
          </div>
        </Stack.Item>
      </Stack>
    </Card.Section>
  );
};

ConditionItem.propTypes = {
  fieldListId: PropTypes.string.isRequired,
  variables: PropTypes.arrayOf(PropTypes.object),
  index: PropTypes.number.isRequired,
  disableRemove: PropTypes.bool.isRequired,
  handleListItemChange: PropTypes.func.isRequired,
  handleRemoveListItem: PropTypes.func.isRequired,
};

ConditionItem.defaultProps = {
  variables: [],
};

export default ConditionItem;
