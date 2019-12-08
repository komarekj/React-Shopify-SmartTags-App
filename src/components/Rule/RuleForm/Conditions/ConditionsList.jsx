import React, { useContext, useMemo, useCallback } from 'react';
import { Layout, Card } from '@shopify/polaris';
import FormContext from '../FormContext';
import conditionVariables from './conditionVariables';
import ConditionMatchType from './ConditionMatchType';
import ConditionItem from './ConditionItem';
import ConditionNew from './ConditionNew';

const FIELD_LIST = 'conditions';
const MATCH_FIELD_ID = 'conditionsType';

const TITLE = 'Conditions';
const DESCRIPTION = 'Create your advanced conditions to assign the tag to specific items';


const Conditions = () => {
  const form = useContext(FormContext);
  const conditions = form.data[FIELD_LIST];

  const variables = useMemo(() => (
    conditionVariables[form.data.resource]
  ), [form]);

  const matchFieldError = useMemo(() => (
    form.errors[MATCH_FIELD_ID]
  ), [form]);

  const conditionCount = useMemo(() => (
    conditions.length
  ), [conditions]);


  /**
   * Handlers
   */
  const handleMatchChange = useCallback((checked, value) => {
    form.handleFormChange(value, MATCH_FIELD_ID);
  }, [form]);

  const handleNewListItem = useCallback(() => {
    form.handleNewListItem(FIELD_LIST);
  }, [form]);

  const handleListItemChange = useCallback((value, id, index) => {
    form.handleListItemChange(value, id, index);
  }, [form]);

  const handleRemoveListItem = useCallback((index) => {
    form.handleRemoveListItem(FIELD_LIST, index);
  }, [form]);


  /**
   * Render
   */
  return (
    <Layout.AnnotatedSection
      title={TITLE}
      description={DESCRIPTION}
    >
      <ConditionMatchType
        fieldId={MATCH_FIELD_ID}
        error={matchFieldError}
        handleMatchChange={handleMatchChange}
      />

      <Card title="Condition Specs">
        {conditions.length && conditions.map((condition, index) => (
          <ConditionItem
            fieldListId={FIELD_LIST}
            variables={variables}
            index={index}
            disableRemove={index === 0 && conditionCount === 1}
            handleListItemChange={handleListItemChange}
            handleRemoveListItem={handleRemoveListItem}
            // eslint-disable-next-line react/no-array-index-key
            key={index}
          />
        ))}

        <ConditionNew handleNewListItem={handleNewListItem} />
      </Card>
    </Layout.AnnotatedSection>
  );
};

export default Conditions;
