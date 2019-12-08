import React from 'react';
import PropTypes from 'prop-types';

import {
  SkeletonPage,
  Layout,
  Card,
  EmptyState,
} from '@shopify/polaris';

const RuleError = ({ handleListReloead }) => (
  <SkeletonPage primaryAction>
    <Layout>
      <Layout.Section>
        <Card sectioned>
          <EmptyState
            heading="Ooops. There was an issue while loading your smart tags"
            action={{ content: 'Try Again', onClick: handleListReloead }}
            image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
          />
        </Card>
      </Layout.Section>
    </Layout>
  </SkeletonPage>
);

RuleError.propTypes = {
  handleListReloead: PropTypes.func.isRequired,
};

export default RuleError;
