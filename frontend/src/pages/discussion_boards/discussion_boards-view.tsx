import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../stores/hooks";
import {useRouter} from "next/router";
import { fetch } from '../../stores/discussion_boards/discussion_boardsSlice'
import dataFormatter from '../../helpers/dataFormatter';
import LayoutAuthenticated from "../../layouts/Authenticated";
import {getPageTitle} from "../../config";
import SectionTitleLineWithButton from "../../components/SectionTitleLineWithButton";
import SectionMain from "../../components/SectionMain";
import CardBox from "../../components/CardBox";
import BaseButton from "../../components/BaseButton";
import BaseDivider from "../../components/BaseDivider";
import {mdiChartTimelineVariant} from "@mdi/js";
import {SwitchField} from "../../components/SwitchField";
import FormField from "../../components/FormField";

const Discussion_boardsView = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { discussion_boards } = useAppSelector((state) => state.discussion_boards)

    const { id } = router.query;

    function removeLastCharacter(str) {
      console.log(str,`str`)
      return str.slice(0, -1);
    }

    useEffect(() => {
        dispatch(fetch({ id }));
    }, [dispatch, id]);

    return (
      <>
          <Head>
              <title>{getPageTitle('View discussion_boards')}</title>
          </Head>
          <SectionMain>
            <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title={removeLastCharacter('View discussion_boards')} main>
                <BaseButton
                  color='info'
                  label='Edit'
                  href={`/discussion_boards/discussion_boards-edit/?id=${id}`}
                />
            </SectionTitleLineWithButton>
            <CardBox>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Course</p>

                        <p>{discussion_boards?.course?.title ?? 'No data'}</p>

                </div>

                <div className={'mb-4'}>
                    <p className={'block font-bold mb-2'}>Topic</p>
                    <p>{discussion_boards?.topic}</p>
                </div>

                <>
                    <p className={'block font-bold mb-2'}>Posts DiscussionBoard</p>
                    <CardBox
                      className='mb-6 border border-gray-300 rounded overflow-hidden'
                      hasTable
                    >
                        <div className='overflow-x-auto'>
                            <table>
                            <thead>
                            <tr>

                            </tr>
                            </thead>
                            <tbody>
                            {discussion_boards.posts_discussion_board && Array.isArray(discussion_boards.posts_discussion_board) &&
                              discussion_boards.posts_discussion_board.map((item: any) => (
                                <tr key={item.id} onClick={() => router.push(`/posts/posts-view/?id=${item.id}`)}>

                                </tr>
                              ))}
                            </tbody>
                        </table>
                        </div>
                        {!discussion_boards?.posts_discussion_board?.length && <div className={'text-center py-4'}>No data</div>}
                    </CardBox>
                </>

                <BaseDivider />

                <BaseButton
                    color='info'
                    label='Back'
                    onClick={() => router.push('/discussion_boards/discussion_boards-list')}
                />
              </CardBox>
          </SectionMain>
      </>
    );
};

Discussion_boardsView.getLayout = function getLayout(page: ReactElement) {
    return (
      <LayoutAuthenticated>
          {page}
      </LayoutAuthenticated>
    )
}

export default Discussion_boardsView;
