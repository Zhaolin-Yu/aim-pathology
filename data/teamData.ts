/** 侧边栏分组，与 SVL People 页类似 */
export const TEAM_CATEGORIES = [
  { id: 'group-leader', label: 'Group Leader' },
  { id: 'team-leader', label: 'Team Leader' },
  { id: 'research-fellow', label: 'Research Fellow' },
  { id: 'phd', label: 'PhD' },
  { id: 'master', label: 'Master' },
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
    role: 'Principal Investigator (PI)',
    link: '#',
    category: 'group-leader',
  },
  {
    name: 'Your Name',
    role: 'Ph.D. Researcher',
    link: '#',
    category: 'phd',
  },
  {
    name: 'Colleague A',
    role: 'Postdoc Researcher',
    link: '#',
    category: 'research-fellow',
  },
]
