import React, { useState, useEffect, useCallback } from 'react';
import {
  Page,
  Layout,
  Card,
  TextField,
  Stack,
  Form,
  FormLayout,
  Button,
  InlineError,
} from '@shopify/polaris';
import { useSelector, useDispatch } from 'react-redux';
import { getInstallUrl } from '../../actions/authActions';
import DashboardSkeleton from '../Dashboard/DashboardSkeleton';

const STORE_SUFIX = '.myshopify.com';

const AppInstall = () => {
  const [store, setStore] = useState('');
  const [hasError, setHasError] = useState(false);

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const installUrl = useSelector((state) => state.auth.installUrl);

  // Redirect when we have install URL
  useEffect(() => {
    if (installUrl) {
      window.top.location.href = installUrl;
    }
  }, [installUrl]);


  /**
   * Handlers
   */
  const handleStoreChange = useCallback((value) => (
    setStore(value)
  ), []);

  const handleSubmit = useCallback(() => {
    if (store) {
      setHasError(false);
      const storeUrl = `${store}${STORE_SUFIX}`;

      if (!isLoading) {
        dispatch(getInstallUrl(storeUrl));
      }
    } else {
      setHasError(true);
    }
  }, [dispatch, store, isLoading]);


  /**
   * Render
   */
  if (isLoading || installUrl) {
    return <DashboardSkeleton />;
  }

  return (
    <Page
      title="Instal SmartTags by Pixelter"
      narrowWidth
    >
      <Layout>
        <Layout.Section>
          <Card title="What's Your Shopify Store URL?" sectioned>
            <Form onSubmit={handleSubmit}>
              <FormLayout>
                <p>View a summary of your online store’s performance.</p>
                <Stack>
                  <Stack.Item fill>
                    <TextField
                      label="Your Store Url"
                      id="storeUrl"
                      suffix={STORE_SUFIX}
                      value={store}
                      onChange={handleStoreChange}
                      labelHidden
                    />
                  </Stack.Item>
                  <Stack.Item>
                    <Button primary submit>Install</Button>
                  </Stack.Item>
                </Stack>
                {hasError && <InlineError message="Store URL is required" fieldID="storeUrl" />}
              </FormLayout>
            </Form>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default AppInstall;
