import React from 'react';
import {
  Card,
  Layout,
  Stack,
  Icon,
  Heading,
  Subheading,
  TextContainer,
} from '@shopify/polaris';

import {
  QuestionMarkMajorMonotone,
  ToolsMajorMonotone,
  ClockMinor,
} from '@shopify/polaris-icons';

const DashboardSidbar = () => (
  <Layout.Section secondary>
    <Card title="How To Use It">
      <Card.Section>
        <TextContainer>
          <Stack alignment="center">
            <Icon source={ToolsMajorMonotone} />
            <Subheading>Creating Tags</Subheading>
          </Stack>
          <p>
            Create advanced rules to automatically assign
            tags to your customers, products, or orders.
          </p>
        </TextContainer>
      </Card.Section>

      <Card.Section>
        <TextContainer>
          <Stack alignment="center">
            <Icon source={ClockMinor} />
            <Subheading>Automatic Updates</Subheading>
          </Stack>
          <p>
            Your tags are updated automatically every few hours or
            in 5 minutes after changing the conditions.
          </p>
        </TextContainer>
      </Card.Section>
    </Card>

    <Card
      title={(
        <Stack alignment="center">
          <Icon source={QuestionMarkMajorMonotone} />
          <Heading>Need Any Help?</Heading>
        </Stack>
      )}
      sectioned
    >
      <p>
        Do you have any questions? Feel free to contact us at&nbsp;
        <a
          href="mailto:support@pixelter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          support@pixelter.com
        </a>
      </p>
    </Card>
  </Layout.Section>
);

export default DashboardSidbar;
