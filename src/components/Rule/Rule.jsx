/* eslint-disable no-underscore-dangle */
import React, { useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Page } from '@shopify/polaris';
import RuleForm from './RuleForm/RuleForm';
import Actions from './Actions';
import FormContext from './RuleForm/FormContext';
import useForm from './RuleForm/hooks/useForm';
import { removeRule, createRule, updateRule } from '../../actions/ruleActions';


const Rule = () => {
  const { id } = useParams();
  const isNew = id === 'new';

  const dispatch = useDispatch();
  const history = useHistory();
  const rules = useSelector((state) => state.rules.items);
  const rule = useMemo(() => (
    rules.find((item) => item._id === id)
  ), [rules, id]);

  const validationRules = {
    name: { required: true },
    tag: { required: true },
    conditionsType: { required: true },
    resource: { required: true },
    'conditions.value': { required: true },
  };

  const form = useForm({ enabled: true, conditions: [{}] }, validationRules);


  /**
   * Action Handlers
   */
  const hanldeSave = useCallback(() => {
    const isValid = form.validate();

    if (isValid) {
      if (isNew) {
        dispatch(createRule(form.data));
      } else {
        dispatch(updateRule(id, form.data));
      }

      history.push('/app/dashboard');
    }
  }, [form, dispatch, history, isNew, id]);

  const handleDelete = useCallback(() => {
    dispatch(removeRule(id));
    history.push('/app/dashboard');
  }, [dispatch, history, id]);


  /**
   * Copy rule specs to form data
   */
  useEffect(() => {
    if (rule) {
      const { _id, ...ruleSpecs } = rule;
      form.setData(ruleSpecs);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rule]);


  /**
   * Render
   */
  return (
    <>
      <Page
        title={isNew ? 'Create New Smart Tag' : 'Edit Smart Tag'}
        primaryAction={{ content: 'Save', onClick: hanldeSave }}
        breadcrumbs={[{ content: 'Smart Tags List', onAction: () => history.push('/app/dashboard') }]}
      >
        <FormContext.Provider value={form}>
          <RuleForm id={id} isNew={isNew} />
        </FormContext.Provider>
      </Page>
      <Page>
        <Actions
          hanldeSave={hanldeSave}
          handleDelete={handleDelete}
          isNew={isNew}
        />
      </Page>
    </>
  );
};

export default Rule;
