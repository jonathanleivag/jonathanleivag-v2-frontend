import { atom } from 'nanostores'
import type { Lang } from './type'

export const isLanguage = atom<Lang>('es')
