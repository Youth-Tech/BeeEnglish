import { TIconStatistical } from '@assets'

export interface ItemStatisticalProps {
  id: number
  state: TIconStatistical
  label: string
  value?: string
}
export const ListStatistical: ItemStatisticalProps[] = [
  {
    id: 1,
    state: 'StreakIcon',
    label: 'attendance_series',
    value: '12',
  },
  {
    id: 2,
    state: 'CrownIcon',
    label: 'level',
    value: 'B2',
  },
  {
    id: 3,
    state: 'AgreeIcon',
    label: 'lesson',
    value: '10',
  },
  {
    id: 4,
    state: 'StartIcon',
    label: 'total_point',
    value: '900',
  },
]

export const ListBadges: Badges[] = [
  {
    id: '1',
    attachments: {
      id: '1',
      src: 'https://tuananhfpt.id.vn/huyhieu_1.png',
      type: 'image',
    },
    desc: 'Chien Binh',
    name: 'Dep trai',
  },
  {
    id: '2',
    attachments: {
      id: '1',
      src: 'https://tuananhfpt.id.vn/huyhieu_2.png',
      type: 'image',
    },
    desc: 'Tan gai',
    name: 'Dinh cua chop',
  },
  {
    id: '3',
    attachments: {
      id: '1',
      src: 'https://tuananhfpt.id.vn/huyhieu_3.png',
      type: 'image',
    },
    desc: 'Phong do',
    name: 'Qua hoan hao',
  },
  {
    id: '4',
    attachments: {
      id: '1',
      src: 'https://tuananhfpt.id.vn/huyhieu_4.png',
      type: 'image',
    },
    desc: 'Nha giau',
    name: 'Thieu gia ti phu',
  },
  {
    id: '5',
    attachments: {
      id: '1',
      src: 'https://tuananhfpt.id.vn/huyhieu_5.png',
      type: 'image',
    },
    desc: 'Hoc gioi',
    name: 'Kien thuc chuyen sau',
  },
]
