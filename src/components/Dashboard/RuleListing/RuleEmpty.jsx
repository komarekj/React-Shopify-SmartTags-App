import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { EmptyState } from '@shopify/polaris';

const RuleEmpty = ({ filter, handleNewRule }) => {
  const heading = useMemo(() => (
    filter ? (
      `No smart tags created for ${filter}`
    ) : (
      'Start with creating your first smart tag'
    )
  ), [filter]);

  return (
    <EmptyState
      heading={heading}
      action={{ content: 'Create New Smart Tag', onClick: handleNewRule }}
      image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
    />
  );
};

RuleEmpty.propTypes = {
  filter: PropTypes.string.isRequired,
  handleNewRule: PropTypes.func.isRequired,
};

export default RuleEmpty;
