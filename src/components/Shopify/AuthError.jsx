import React from 'react';
import { EmptyState } from '@shopify/polaris';

const AuthError = () => (
  <EmptyState
    heading="Ooops! Something went wrong :("
    image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
  >
    <p>Reload the page any try again..</p>
  </EmptyState>
);

export default AuthError;
