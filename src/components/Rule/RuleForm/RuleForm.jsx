import React from 'react';
import { Layout, Form } from '@shopify/polaris';
import Status from './Status';
import BasicInfo from './BasicInfo';
import ResourceType from './RecourceType';
import Tag from './Tag';
import ConditionsList from './Conditions/ConditionsList';

import './RuleForm.css';

const RuleForm = () => (
  <Form>
    <Layout>
      <Status />
      <BasicInfo />
      <ResourceType />
      <Tag />
      <ConditionsList />
    </Layout>
  </Form>
);

export default RuleForm;
