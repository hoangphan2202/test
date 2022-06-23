import { FaFacebookF, FaTelegramPlane, FaTwitter, FaYoutube, FaTiktok, FaFax, FaDiscord } from 'react-icons/fa'
import classNames from 'classnames'
import useI18n from '../../hooks/use-i18n'
import Container from '../Container/Container'
import { FiMail } from 'react-icons/fi'
import Logo from '../Header/Logo'
import { BsTelephone } from 'react-icons/bs'

const LIST = [
  {
    icon: <FaTwitter className="text-2xl group-hover:text-primaryYellow" />,
    href: 'https://twitter.com/spac3shipglobal',
  },
  {
    icon: <FaTelegramPlane className="text-2xl group-hover:text-primaryYellow" />,
    href: 'https://t.me/SPAC3SHIPTotheMoonOfficialGroup',
  },
  {
    icon: <FaFacebookF className="text-2xl group-hover:text-primaryYellow" />,
    href: 'https://www.facebook.com/SPAC3SHIPToTheMoon/',
  },
  {
    icon: <FaDiscord className="text-2xl group-hover:text-primaryYellow" />,
    href: 'https://discord.io/SPAC3SHIPToTheMoon',
  },
  {
    icon: <FaYoutube className="text-2xl group-hover:text-primaryYellow" />,
    href: 'https://www.youtube.com/channel/UCs15HlwgHOE6TBxMwMd8ILg',
  },
  {
    icon: <FaTiktok className="text-2xl group-hover:text-primaryYellow" />,
    href: 'https://www.tiktok.com/@spac3shiptothemoon',
  },
]

const Footer = () => {
  const i18n = useI18n()

  return (
    <footer className="pt-20 pb-5">
      <Container className="px-3">
        <div className="flex justify-center">
          <Logo />
        </div>
        <div className="my-3 flex items-center justify-center space-x-4 sm:space-x-20">
          <img alt="s3s logo" src="/images/layout/s3s.png" className="w-full max-w-[100px] " />
          <img alt="ygg logo" src="/images/layout/ygg.png" className="w-full max-w-[70px]" />
          <img
            alt="saigon innovation hub"
            src="/images/layout/saigon-innovation-hub.png"
            className="w-full max-w-[150px] "
          />
        </div>
        <div className="mx-auto text-sm sm:text-md ">
          <div>
            <div className="flex flex-col items-center justify-between py-4 text-center">
              <div>
                <p>{i18n.t('address')}</p>
                <p>{i18n.t('addressOffice')}</p>
              </div>
              <div className="mt-5 flex-wrap text-center md:flex md:space-x-10">
                <span className="flex items-center">
                  <BsTelephone className="mr-1" /> {i18n.t('callUs')}: 1900633465
                </span>
                <a
                  rel="noopener"
                  href="mailto:support@blockchainexpo"
                  className="flex items-center hover:text-primaryYellow hover:underline"
                >
                  <FiMail className="mr-1" /> Mail: business@spac3ship.com
                </a>

                <span className="flex items-center">
                  <FaFax className="mr-1" /> Fax: 0839101073
                </span>
              </div>
            </div>
            <div className="mb-5 flex items-center justify-center space-x-4 sm:space-x-12">
              {LIST.map((item, index) => (
                <a
                  rel="noreferrer"
                  key={`list-social-${index}`}
                  className={classNames(
                    'group rounded-full border p-2 hover:border-primaryYellow hover:text-primaryYellow',
                    item?.href && 'cursor-pointer',
                  )}
                  target={'_blank'}
                  href={item.href}
                >
                  {item.icon}
                </a>
              ))}
            </div>
            <p className="pb-4 text-center">
              © {new Date().getFullYear()} Blockchain Global Day. {i18n.t('allRightReserved')}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
