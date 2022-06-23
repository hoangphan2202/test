import useI18n from '../hooks/use-i18n'
import { useEffect } from 'react'
import EN from './en.json'
import VI from './vi.json'
import { useLanguage } from '../store/user/hook'

const I18nProvider = ({ children }) => {
  const i18n = useI18n()
  const { language } = useLanguage()

  useEffect(() => {
    if (language === 'vi') {
      i18n.locale('vi', VI)
    } else {
      i18n.locale('en', EN)
    }
  }, [language])

  return children
}

export default I18nProvider
