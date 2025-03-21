import { useEffect, type FC } from 'react'
import type { Lang, LanguageSharedComponentProps } from '../../type'
import { isLanguage } from '../../store'
import { useStore } from '@nanostores/react'
const LanguageSharedComponent: FC<LanguageSharedComponentProps> = ({
  className = ''
}) => {
  const $lang = useStore(isLanguage)

  useEffect(() => {
    const langStorage = localStorage.getItem('lang')

    if (langStorage !== null) {
      isLanguage.set(langStorage as Lang)
    } else {
      localStorage.setItem('lang', $lang)
    }

    return () => {}
  }, [])

  const handlerChangeLanguage = (lang: Lang): void => {
    const isLang: Lang = lang === 'en' ? 'es' : 'en'
    isLanguage.set(isLang)
    localStorage.setItem('lang', isLang)
  }

  return (
    <button className={className} onClick={() => handlerChangeLanguage($lang)}>
      {$lang}
    </button>
  )
}

export default LanguageSharedComponent
