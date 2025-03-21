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
  title?: string
  works?: Work[]
}

export interface Work {
  name?: string
  jobTitle?: string
  skills?: string[]
  dateStart?: string
  dateEnd?: null | string
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
  info: RestEndpointMethodTypes['users']['getAuthenticated']['response']['data']
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

export interface Navbar {
  _id: ObjectId
  lan: Lang
  nav: string[]
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
