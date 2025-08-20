import * as icon from '@mdi/js';
import { MenuAsideItem } from './interfaces'

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: icon.mdiViewDashboardOutline,
    label: 'Dashboard',
  },

  {
    href: '/users/users-list',
    label: 'Users',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiAccountGroup ?? icon.mdiTable,
    permissions: 'READ_USERS'
  },
  {
    href: '/achievements/achievements-list',
    label: 'Achievements',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiTrophyOutline' in icon ? icon['mdiTrophyOutline' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_ACHIEVEMENTS'
  },
  {
    href: '/courses/courses-list',
    label: 'Courses',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiBookOpenPageVariant' in icon ? icon['mdiBookOpenPageVariant' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_COURSES'
  },
  {
    href: '/discussion_boards/discussion_boards-list',
    label: 'Discussion boards',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiForumOutline' in icon ? icon['mdiForumOutline' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_DISCUSSION_BOARDS'
  },
  {
    href: '/enrollments/enrollments-list',
    label: 'Enrollments',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiClipboardCheckOutline' in icon ? icon['mdiClipboardCheckOutline' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_ENROLLMENTS'
  },
  {
    href: '/materials/materials-list',
    label: 'Materials',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiFileDocumentOutline' in icon ? icon['mdiFileDocumentOutline' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_MATERIALS'
  },
  {
    href: '/instructors/instructors-list',
    label: 'Instructors',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiTeach' in icon ? icon['mdiTeach' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_INSTRUCTORS'
  },
  {
    href: '/posts/posts-list',
    label: 'Posts',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiCommentTextOutline' in icon ? icon['mdiCommentTextOutline' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_POSTS'
  },
  {
    href: '/students/students-list',
    label: 'Students',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiSchool' in icon ? icon['mdiSchool' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_STUDENTS'
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: icon.mdiAccountCircle,
  },

 {
    href: '/api-docs',
    target: '_blank',
    label: 'Swagger API',
    icon: icon.mdiFileCode,
    permissions: 'READ_API_DOCS'
  },
]

export default menuAside
