import {atom} from 'nanostores'
import type {CVCProfessionalProfile, CVPersonalData, EducationElement, Lang, technologies, Work} from './type'

export const isLanguage = atom<Lang>('es')
export const personalData = atom<CVPersonalData>({
    name: '',
    profession: ''
})
export const professionalProfile = atom<CVCProfessionalProfile>({
    content: '',
    experience: '',
    specialties:''
})
export const works = atom<Work[]>([])
export const technologiesAll = atom<technologies[]>([])
export const educationAll = atom<EducationElement[]>([])
