import React from 'react';
import PropTypes from 'prop-types';
import { PageActions } from '@shopify/polaris';

const Actions = ({ isNew, hanldeSave, handleDelete }) => {
  const primaryAction = {
    content: 'Save',
    onClick: hanldeSave,
  };

  const secondaryActions = [{
    content: 'Delete',
    destructive: true,
    onClick: handleDelete,
  }];

  return (
    <PageActions
      primaryAction={primaryAction}
      secondaryActions={isNew ? [] : secondaryActions}
    />
  );
};

Actions.propTypes = {
  isNew: PropTypes.bool.isRequired,
  hanldeSave: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Actions;
