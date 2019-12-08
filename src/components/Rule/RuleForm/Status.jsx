import React, { useContext } from 'react';
import {
  Layout,
  SettingToggle,
  TextStyle,
} from '@shopify/polaris';
import FormContext from './FormContext';

const TITLE = 'Basic Details';
const DESCRIPTION = 'Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.';

const Status = () => {
  const form = useContext(FormContext);

  const action = {
    content: form.data.enabled ? 'Disable' : 'Enable',
    onAction: () => form.handleFormChange(!form.data.enabled, 'enabled'),
  };

  return (
    <Layout.Section
      title={TITLE}
      description={DESCRIPTION}
    >
      <SettingToggle
        action={action}
        enabled={form.data.enabled}
      >
        This smart tag is&nbsp;
        <TextStyle variation="strong">
          {form.data.enabled ? 'Enabled' : 'Disabled'}
        </TextStyle>
        .
      </SettingToggle>
    </Layout.Section>
  );
};

export default Status;
