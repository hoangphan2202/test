import Link from 'next/link'
import useI18n from '../../hooks/use-i18n'

const Logo = () => {
  const i18n = useI18n()

  return (
    <Link href="/[lng]" as={`/${i18n.activeLocale}`}>
      <img alt="logo" src="/images/logo.png" className="max-w-[200px] cursor-pointer sm:max-w-[253px]" />
    </Link>
  )
}

export default Logo
