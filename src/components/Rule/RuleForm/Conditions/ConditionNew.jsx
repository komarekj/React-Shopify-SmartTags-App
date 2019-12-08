import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Button,
  Icon,
  Stack,
} from '@shopify/polaris';
import { AddCodeMajorMonotone } from '@shopify/polaris-icons';

const ConditionNew = ({ handleNewListItem }) => (
  <Card.Section>
    <Button onClick={handleNewListItem} outline fullWidth>
      <Stack alignment="center" spacing="tight">
        <Icon source={AddCodeMajorMonotone} />
        <Stack.Item>
          Add Condition
        </Stack.Item>
      </Stack>
    </Button>
  </Card.Section>
);

ConditionNew.propTypes = {
  handleNewListItem: PropTypes.func.isRequired,
};

export default ConditionNew;
