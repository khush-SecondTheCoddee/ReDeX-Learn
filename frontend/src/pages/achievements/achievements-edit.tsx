import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js'
import Head from 'next/head'
import React, { ReactElement, useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

import CardBox from '../../components/CardBox'
import LayoutAuthenticated from '../../layouts/Authenticated'
import SectionMain from '../../components/SectionMain'
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton'
import { getPageTitle } from '../../config'

import { Field, Form, Formik } from 'formik'
import FormField from '../../components/FormField'
import BaseDivider from '../../components/BaseDivider'
import BaseButtons from '../../components/BaseButtons'
import BaseButton from '../../components/BaseButton'
import FormCheckRadio from '../../components/FormCheckRadio'
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup'
import { SelectField } from "../../components/SelectField";
import { SelectFieldMany } from "../../components/SelectFieldMany";
import { SwitchField } from '../../components/SwitchField'
import {RichTextField} from "../../components/RichTextField";

import { update, fetch } from '../../stores/achievements/achievementsSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'
import dataFormatter from '../../helpers/dataFormatter';

const EditAchievementsPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {

    student: null,

    course: null,

    date_awarded: new Date(),

  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { achievements } = useAppSelector((state) => state.achievements)

  const { id } = router.query

  useEffect(() => {
    dispatch(fetch({ id: id }))
  }, [id])

  useEffect(() => {
    if (typeof achievements === 'object') {
      setInitialValues(achievements)
    }
  }, [achievements])

  useEffect(() => {
      if (typeof achievements === 'object') {
          const newInitialVal = {...initVals};
          Object.keys(initVals).forEach(el => newInitialVal[el] = (achievements)[el])
          setInitialValues(newInitialVal);
      }
  }, [achievements])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }))
    await router.push('/achievements/achievements-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit achievements')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit achievements'} main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>

  <FormField label='Student' labelFor='student'>
        <Field
            name='student'
            id='student'
            component={SelectField}
            options={initialValues.student}
            itemRef={'students'}

            showField={'user'}

        ></Field>
    </FormField>

  <FormField label='Course' labelFor='course'>
        <Field
            name='course'
            id='course'
            component={SelectField}
            options={initialValues.course}
            itemRef={'courses'}

            showField={'title'}

        ></Field>
    </FormField>

      <FormField
          label="DateAwarded"
      >
          <DatePicker
              dateFormat="yyyy-MM-dd hh:mm"
              showTimeSelect
              selected={initialValues.date_awarded ?
                  new Date(
                      dayjs(initialValues.date_awarded).format('YYYY-MM-DD hh:mm'),
                  ) : null
              }
              onChange={(date) => setInitialValues({...initialValues, 'date_awarded': date})}
          />
      </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/achievements/achievements-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

EditAchievementsPage.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
  )
}

export default EditAchievementsPage
