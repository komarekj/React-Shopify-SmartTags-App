/* eslint-disable no-underscore-dangle */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  Badge,
  TextStyle,
  Heading,
  ResourceList,
  ResourceItem,
  Stack,
} from '@shopify/polaris';


import './RuleListing.css';

const RuleListing = ({ list }) => {
  const history = useHistory();

  /**
   * Handlers
   */
  const handleRuleClick = useCallback((id) => {
    history.push(`/app/rule/${id}`);
  }, [history]);


  /**
   * Render
   */
  const renderItem = useCallback((rule) => (
    <ResourceItem
      id={rule._id}
      shortcutActions={[{ content: 'Edit', onClick: () => handleRuleClick(rule._id) }]}
      onClick={handleRuleClick}
    >
      <Stack
        alignment="center"
        spacing="extraLoose"
        wrap={false}
      >
        <Stack.Item>
          <div className="rule-listing-item__status">
            {rule.enabled ? (
              <Badge status="success">Enabled</Badge>
            ) : (
              <Badge status="warning">Disabled</Badge>
            )}
          </div>
        </Stack.Item>
        <Stack.Item fill>
          <div className="rule-listing-item__item-info">
            <Heading>{rule.name}</Heading>
            <TextStyle variation="subdued">{rule.description}</TextStyle>
          </div>
          <Badge>{rule.tag}</Badge>
        </Stack.Item>
      </Stack>
    </ResourceItem>
  ), [handleRuleClick]);

  return (
    <div className="rule-listing">
      <ResourceList
        items={list}
        renderItem={(rule) => renderItem(rule)}
      />
    </div>
  );
};

RuleListing.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RuleListing;
