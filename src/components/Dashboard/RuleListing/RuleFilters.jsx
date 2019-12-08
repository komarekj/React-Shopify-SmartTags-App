import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from '@shopify/polaris';

const RuleFilters = ({ handleFilterChange, currentFilter }) => {
  const filters = [
    { content: 'All Tags', id: 'all' },
    { content: 'Customer Tags', id: 'customer' },
    { content: 'Order Tags', id: 'order' },
    { content: 'Product Tags', id: 'product' },
  ];

  const selected = useMemo(() => (
    currentFilter ? filters.findIndex((item) => item.id === currentFilter) : 0
  ), [currentFilter, filters]);

  const handleTabChange = useCallback((index) => {
    const filterId = filters[index].id;
    const filter = filterId === 'all' ? null : filterId;
    handleFilterChange(filter);
  }, [handleFilterChange, filters]);

  return (
    <Tabs
      tabs={filters}
      selected={selected}
      onSelect={handleTabChange}
    />
  );
};

RuleFilters.propTypes = {
  handleFilterChange: PropTypes.func.isRequired,
  currentFilter: PropTypes.string,
};

RuleFilters.defaultProps = {
  currentFilter: null,
};

export default RuleFilters;
