import React from 'react';
import {
  Frame,
  Loading,
  SkeletonPage,
  Layout,
  Card,
  SkeletonBodyText,
  SkeletonDisplayText,
  TextContainer,
} from '@shopify/polaris';

const DashboardSkeleton = () => (
  <Frame>
    <Loading />
    <SkeletonPage primaryAction>
      <Layout>
        <Layout.Section>
          <Card sectioned>
            {[...Array(8)].map((index) => (
              <Card.Section key={index}>
                <SkeletonBodyText lines={2} />
              </Card.Section>
            ))}
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          {[...Array(2)].map((index) => (
            <Card sectioned key={index}>
              <TextContainer>
                <SkeletonDisplayText size="medium" />
                <SkeletonBodyText lines={8} />
              </TextContainer>
            </Card>
          ))}
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  </Frame>
);

export default DashboardSkeleton;
