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

import { update, fetch } from '../../stores/instructors/instructorsSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'
import dataFormatter from '../../helpers/dataFormatter';

const EditInstructorsPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {

    user: null,

    qualifications: '',

  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { instructors } = useAppSelector((state) => state.instructors)

  const { id } = router.query

  useEffect(() => {
    dispatch(fetch({ id: id }))
  }, [id])

  useEffect(() => {
    if (typeof instructors === 'object') {
      setInitialValues(instructors)
    }
  }, [instructors])

  useEffect(() => {
      if (typeof instructors === 'object') {
          const newInitialVal = {...initVals};
          Object.keys(initVals).forEach(el => newInitialVal[el] = (instructors)[el])
          setInitialValues(newInitialVal);
      }
  }, [instructors])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }))
    await router.push('/instructors/instructors-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit instructors')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit instructors'} main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>

  <FormField label='User' labelFor='user'>
        <Field
            name='user'
            id='user'
            component={SelectField}
            options={initialValues.user}
            itemRef={'users'}

            showField={'firstName'}

        ></Field>
    </FormField>

    <FormField label="Qualifications" hasTextareaHeight>
        <Field name="qualifications" as="textarea" placeholder="Qualifications" />
    </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/instructors/instructors-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

EditInstructorsPage.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
  )
}

export default EditInstructorsPage
