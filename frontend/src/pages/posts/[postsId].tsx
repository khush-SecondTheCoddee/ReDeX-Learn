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

import { update, fetch } from '../../stores/posts/postsSlice'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'

const EditPosts = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const initVals = {

    discussion_board: null,

    author: null,

    content: '',

  }
  const [initialValues, setInitialValues] = useState(initVals)

  const { posts } = useAppSelector((state) => state.posts)

  const { postsId } = router.query

  useEffect(() => {
    dispatch(fetch({ id: postsId }))
  }, [postsId])

  useEffect(() => {
    if (typeof posts === 'object') {
      setInitialValues(posts)
    }
  }, [posts])

  useEffect(() => {
      if (typeof posts === 'object') {

          const newInitialVal = {...initVals};

          Object.keys(initVals).forEach(el => newInitialVal[el] = (posts)[el])

          setInitialValues(newInitialVal);
      }
  }, [posts])

  const handleSubmit = async (data) => {
    await dispatch(update({ id: postsId, data }))
    await router.push('/posts/posts-list')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit posts')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={'Edit posts'} main>
        {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>

    <FormField label='DiscussionBoard' labelFor='discussion_board'>
        <Field
            name='discussion_board'
            id='discussion_board'
            component={SelectField}
            options={initialValues.discussion_board}
            itemRef={'discussion_boards'}

            showField={'topic'}

        ></Field>
    </FormField>

    <FormField label='Author' labelFor='author'>
        <Field
            name='author'
            id='author'
            component={SelectField}
            options={initialValues.author}
            itemRef={'users'}

            showField={'firstName'}

        ></Field>
    </FormField>

    <FormField label='Content' hasTextareaHeight>
        <Field
            name='content'
            id='content'
            component={RichTextField}
        ></Field>
    </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Submit" />
                <BaseButton type="reset" color="info" outline label="Reset" />
                <BaseButton type='reset' color='danger' outline label='Cancel' onClick={() => router.push('/posts/posts-list')}/>
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  )
}

EditPosts.getLayout = function getLayout(page: ReactElement) {
  return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
  )
}

export default EditPosts
