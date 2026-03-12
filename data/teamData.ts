export const TEAM_CATEGORIES = [
  { id: 'group-leader', label: 'Group Leader' },
  { id: 'team-leader', label: 'Team Leader' },
  { id: 'research-fellow', label: 'Research Fellow' },
  { id: 'phd', label: 'PhD' },
  { id: 'master', label: 'Master' },
  { id: 'bachelor', label: 'Bachelor' },
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
    category: 'group-leader',
  },
  {
    name: 'Litao Yang',
    role: 'Research Fellow',
    link: 'https://research.monash.edu/en/persons/litao-yang/',
    category: 'team-leader',
  },
  {
    name: 'Zhenhua Chen',
    role: 'zhenhua.chen@monash.edu',
    category: 'phd',
  },
  {
    name: 'Yunshu Chen',
    role: 'yunshu.chen@monash.edu',
    category: 'phd',
  },
  {
    name: 'Chang Yuwen',
    role: 'chang.yuwen@monash.edu',
    category: 'phd',
  },
  {
    name: 'Zhaolin Yu',
    role: 'zyuu0081@student.monash.edu',
    category: 'master',
  },
  {
    name: 'Jason Liu',
    role: 'jason.liu1@monash.edu',
    category: 'bachelor',
  },
]
