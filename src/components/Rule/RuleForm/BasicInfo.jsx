import React from 'react';
import { Layout, Card, FormLayout } from '@shopify/polaris';
import FormField from './FormField';

const TITLE = 'Basic Details';
const DESCRIPTION = 'Give your tag a proper name to make it easy to identify each tag in the future';

const BasicInfo = () => (
  <Layout.AnnotatedSection
    title={TITLE}
    description={DESCRIPTION}
  >
    <Card sectioned>
      <FormLayout>
        <FormField
          name="Name"
          id="name"
          fieldType="textField"
        />
        <FormField
          name="Description (optional)"
          id="description"
          fieldType="textField"
        />
      </FormLayout>
    </Card>
  </Layout.AnnotatedSection>
);

export default BasicInfo;
