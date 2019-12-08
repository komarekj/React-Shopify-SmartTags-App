import React from 'react';
import {
  Layout,
  Card,
  FormLayout,
} from '@shopify/polaris';
import FormField from './FormField';

const TITLE = 'Tag';
const DESCRIPTION = 'Enter the tag we should assign if your resource meets conditions';

const Tag = () => (
  <Layout.AnnotatedSection
    title={TITLE}
    description={DESCRIPTION}
  >
    <Card sectioned>
      <FormLayout>
        <FormField
          name="Tag"
          id="tag"
          maxLength={60}
          showCharacterCount
          labelHidden
        />
      </FormLayout>
    </Card>
  </Layout.AnnotatedSection>
);

export default Tag;
