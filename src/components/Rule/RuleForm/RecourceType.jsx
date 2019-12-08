import React, {
  useContext,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import {
  Layout,
  Card,
  Stack,
  InlineError,
} from '@shopify/polaris';
import FormField from './FormField';
import FormContext from './FormContext';

const FIELD_ID = 'resource';

const TITLE = 'Type';
const DESCRIPTION = 'Select what resource type your tag should use for your rule';

const ResourceType = () => {
  const form = useContext(FormContext);

  const buttons = [
    { name: 'Customer', id: 'customer', helpText: 'Best for segmenting customer based on their order history' },
    { name: 'Product', id: 'product', helpText: 'Best for automatic collection assignment with smart tags' },
    { name: 'Order', id: 'order', helpText: 'Best for making your order handling easy for your team' },
  ];

  const errorMsg = useMemo(() => (
    form.errors[FIELD_ID]
  ), [form]);

  const handleChange = useCallback((checked, value) => {
    form.handleFormChange(value, FIELD_ID);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Pre-select the first option
  useEffect(() => {
    form.handleFormChange(buttons[0].id, FIELD_ID);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout.AnnotatedSection
      title={TITLE}
      description={DESCRIPTION}
    >
      <Card sectioned>
        <Stack vertical>
          {buttons.map((button) => (
            <FormField
              key={button.id}
              fieldType="radioButton"
              name={button.name}
              id={FIELD_ID}
              radioId={button.id}
              helpText={button.helpText}
              onChange={handleChange}
            />
          ))}
        </Stack>
        {errorMsg && (
          <InlineError
            message={`Resource is ${errorMsg}`}
            fieldID={FIELD_ID}
          />
        )}
      </Card>
    </Layout.AnnotatedSection>
  );
};

export default ResourceType;
