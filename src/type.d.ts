import {RefObject} from 'react'

export interface LanguageSharedComponentProps {
  className?: string
}

export type useDataFetchResponse<T> = [T, boolean, string | null]

export interface LogoSharedComponentProps {
  className?: string
}

export interface MenuDesktopComponentProps {
  data: Navbar
  loading: boolean
}

export interface MenuMobileComponentProps extends MenuDesktopComponentProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export interface HeaderSharedComponentProps {
  children: ReactNode
}

export interface technologies {
  name: string
  delay: string
  icon: string
  url: string
}

export interface IFormInput {
  name: string
  email: string
  message: string
}

/* -------------------------------------------------------------------------- */
/*                                  Response                                  */
/* -------------------------------------------------------------------------- */
export interface Res<T> {
  data: T | null
  error: string | null
  status: number
  statusText: string
}

type ResWhitOutDataOmit = Omit<Res, 'data'>

export interface ResWhitOutData extends ResWhitOutDataOmit {
  message: string
}

export type Lang = 'es' | 'en'

export interface LangQuery {
  lang: Lang
}

/* -------------------------------------------------------------------------- */
/*                                request Email                               */
/* -------------------------------------------------------------------------- */
export interface EmailBody {
  name: string
  email: string
  content: string
}

/* -------------------------------------------------------------------------- */
/*                                    HERO                                    */
/* -------------------------------------------------------------------------- */
export interface Hero {
  _id: string
  title: string
  description: string
  image: string
  createdAt: Date
  updatedAt: Date
}

/* -------------------------------------------------------------------------- */
/*                                   contact                                  */
/* -------------------------------------------------------------------------- */

export interface Contact {
  _id: string
  email: Email
  createdAt: Date
  updatedAt: Date
}

export type ContactOmit = Omit<Contact, '_id'>

export interface Email {
  data: Data | null
  error: any | null
}

export interface Data {
  object: string
  id: string
  to: string[]
  from: string
  created_at: string
  subject: string
  bcc: null
  cc: null
  reply_to: null
  last_event: null
  html: string
  text: null
  scheduled_at: null
}

type ContactEmailOmit = Omit<Email, 'data'>
type ContactDataOmit = Omit<Data, 'id'>

export interface ContactEmail extends ContactEmailOmit {
  data: ContactDataOmit
}

export interface ContactSeed {
  email: ContactEmail
}

/* -------------------------------------------------------------------------- */
/*                                  About Me                                  */
/* -------------------------------------------------------------------------- */

export interface AboutMes {
  _id: string
  title: string
  description: string
  education: TranslationEducation
  skills: Skills
  interests: Interests
  knowledge: TranslationKnowledge
  courses: Course[]
  works: Iwork
  image: string
  createdAt: Date
  updatedAt: Date
}

export interface Course {
  name: string
  content: string
  _id: string
}

export interface TranslationEducation {
  title: string
  education: EducationElement[]
}

export interface EducationElement {
  name: string
  degree: string
  establishment: string
  dateStart: string
  dateEnd: string
  _id: string
}

export interface Interests {
  title: string
  interests: string[]
}

export interface TranslationKnowledge {
  title: string
  knowledge: PurpleKnowledge[]
}

export interface PurpleKnowledge {
  title: string
  knowledge: FluffyKnowledge[]
  _id: string
}

export interface FluffyKnowledge {
  language: string
  icon: string
  url: string
  _id: string
}

export interface Skills {
  title: string
  skills: Skill[]
}

export interface Skill {
  title: string
  content: string
  _id: string
}

export interface Iwork {
  title: string
  works: Work[]
}

export interface Work {
  name: string
  jobTitle?: string
  skills?: string[]
  dateStart: string
  dateEnd: null | string
}

/* -------------------------------------------------------------------------- */
/*                                   Project                                  */
/* -------------------------------------------------------------------------- */
export interface PinnedRepo {
  name: string
  description: string | null
  url: string
  stargazerCount: number
  forkCount: number
}

export interface IProject {
  pinned: PinnedRepo[]
  readme: string
  info: Iinfo
}

export interface Iinfo {
  login?: string
  id?: number
  nodeID?: string
  avatar_url?: string
  gravatarID?: string
  url?: string
  html_url?: string
  followersURL?: string
  followingURL?: string
  gistsURL?: string
  starredURL?: string
  subscriptionsURL?: string
  organizationsURL?: string
  reposURL?: string
  eventsURL?: string
  receivedEventsURL?: string
  type?: string
  userViewType?: string
  siteAdmin?: boolean
  name?: string
  company?: string
  blog?: string
  location?: null
  email?: null
  hireable?: null
  bio?: string
  twitterUsername?: string
  notificationEmail?: null
  public_repos?: number
  publicGists?: number
  followers?: number
  following?: number
  createdAt?: Date
  updatedAt?: Date
  privateGists?: number
  totalPrivateRepos?: number
  ownedPrivateRepos?: number
  diskUsage?: number
  collaborators?: number
  twoFactorAuthentication?: boolean
  plan?: Plan
}

export interface Plan {
  name?: string
  space?: number
  collaborators?: number
  privateRepos?: number
}

/* -------------------------------------------------------------------------- */
/*                                   header                                   */
/* -------------------------------------------------------------------------- */

export interface Header {
  _id: ObjectId
  lan: Lang
  title: string
  name: string
  subTitle: string
  buttonText: string
  imageUrl: string
}

export interface nav {
  nav: string
  router: string
}

export interface Navbar {
  _id: ObjectId
  lan: Lang
  nav: nav[]
  image: string
}

/* -------------------------------------------------------------------------- */
/*                                   social                                   */
/* -------------------------------------------------------------------------- */
export interface Social {
  name: string
  icon: string
  url: string
}

export interface ResSocial {
  _id: ObjectId
  socials: Social[]
}

export interface ErrorMessageComponentProps {
  message?: string
  status?: number
}

export interface Pagination<T> extends ErrorMessageComponentProps {
  docs: T[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: null
  nextPage: null
}

export interface Blog extends ErrorMessageComponentProps {
  _id: string
  title: string
  content: string
  description: string
  image: string
  published: boolean
  slug: string
  tags: string[]
  views: number
  readingTime: number
  popular: boolean
  user: User
  category: Category
  createdAt: Date
  updatedAt: Date
}


export interface  CvSButtonharedComponentProps {
  text: string
}

export interface CVPersonalData {
  name: string
  profession: string

}

export interface CVCProfessionalProfile {
  content: string
  experience: string
  specialties: string
}

export interface CvSharedComponentProps {
  cvRef: RefObject<HTMLDivElement | null>
}
