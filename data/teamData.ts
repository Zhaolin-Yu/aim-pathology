export const TEAM_CATEGORIES = [
  { id: 'group-leader', label: 'Group Leader' },
  { id: 'team-leader', label: 'Team Leader' },
  { id: 'research-fellow', label: 'Research Fellow' },
  { id: 'phd', label: 'PhD Student' },
  { id: 'master', label: 'Master Student' },
  { id: 'bachelor', label: 'Bachelor Student' },
  { id: 'other', label: '' },
] as const

export type TeamCategoryId = (typeof TEAM_CATEGORIES)[number]['id']

export type TeamMember = {
  name: string
  role: string
  link?: string
  /** 成员照片 URL，可选；无则显示首字母占位 */
  image?: string
  category: TeamCategoryId
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Zongyuan Ge',
    role: 'Founding Director of the AIM for Health Lab',
    link: 'https://research.monash.edu/en/persons/zongyuan-ge/',
    image: '/static/images/team/zongyuan-ge.jpg',
    category: 'group-leader',
  },
  {
    name: 'Litao Yang',
    role: 'litao.yang@monash.edu',
    link: 'https://research.monash.edu/en/persons/litao-yang/',
    image: '/static/images/team/litao-yang.jpg',
    category: 'team-leader',
  },
  {
    name: 'Chang Yuwen',
    role: 'chang.yuwen@monash.edu',
    image: '/static/images/team/chang-yuwen.jpg',
    category: 'phd',
  },
  {
    name: 'Jason Liu',
    role: 'jason.liu1@monash.edu',
    image: '/static/images/team/jason-liu.jpg',
    category: 'bachelor',
  },
  {
    name: 'Linchao He',
    role: '',
    category: 'phd',
  },
  {
    name: 'Weng Hong Hui',
    role: 'whui0008@student.monash.edu',
    image: '/static/images/team/weng-hong-hui.jpg',
    category: 'master',
  },
  {
    name: 'Yunshu Chen',
    role: 'yunshu.chen@monash.edu',
    image: '/static/images/team/yunshu-chen.jpg',
    category: 'phd',
  },
  {
    name: 'Zhaolin Yu',
    role: 'zyuu0081@student.monash.edu',
    image: '/static/images/team/zhaolin-yu.jpg',
    category: 'master',
  },
  {
    name: 'Zhenhua Chen',
    role: 'zhenhua.chen@monash.edu',
    image: '/static/images/team/zhenhua-chen.jpg',
    category: 'phd',
  },
  {
    name: 'Zhipen Luo',
    role: '',
    category: 'other',
  },
]
