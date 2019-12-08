import React, { useState, useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Page, Card, Layout } from '@shopify/polaris';
import RuleListing from './RuleListing/RuleListing';
import RuleFilters from './RuleListing/RuleFilters';
import RuleEmpty from './RuleListing/RuleEmpty';
import RuleError from './RuleListing/RuleError';
import DashboardSkeleton from './DashboardSkeleton';
import DashboardSidebar from './DashboardSidebar';
import { listRules } from '../../actions/ruleActions';

const Dashboard = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const list = useSelector((state) => state.rules.items);
  const loading = useSelector((state) => state.rules.loading);
  const hasError = useSelector((state) => state.rules.hasError);

  const [filter, setFilter] = useState();
  const filteredList = useMemo(() => (
    filter ? list.filter((item) => item.resource === filter) : list
  ), [filter, list]);


  /**
   * Handlers
   */
  const handleNewRule = useCallback(() => {
    history.push('/app/rule/new');
  }, [history]);

  const handleFilterChange = useCallback((selectedFilter) => {
    setFilter(selectedFilter);
  }, []);

  const handleListReloead = useCallback(() => {
    dispatch(listRules());
  }, [dispatch]);


  /**
   * Render
   */
  if (loading) {
    return <DashboardSkeleton />;
  }

  if (hasError) {
    return <RuleError handleListReloead={handleListReloead} />;
  }

  return (
    <Page
      title="Your Smart Tags"
      primaryAction={{ content: 'Create New', onClick: handleNewRule }}
    >
      <Layout>
        <Layout.Section>
          <Card>
            <RuleFilters
              handleFilterChange={handleFilterChange}
              currentFilter={filter}
            />

            {filteredList.length > 0 ? (
              <RuleListing list={filteredList} filter={filter} />
            ) : (
              <RuleEmpty filter={filter} handleNewRule={handleNewRule} />
            )}
          </Card>
        </Layout.Section>

        <DashboardSidebar />
      </Layout>
    </Page>
  );
};

export default Dashboard;
