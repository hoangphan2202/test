import { useState, Fragment } from 'react'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import useI18n from '../../hooks/use-i18n'
import Link from 'next/link'
import { Transition } from '@headlessui/react'
import EN from 'locales/en.json'
import VI from 'locales/vi.json'

const MenuMobile = ({ className, listMenu, isAdmin = false }) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const i18n = useI18n()

  return (
    <div className={classNames(className, 'relative z-20 md:hidden')}>
      {open ? (
        <img
          alt="menu-open"
          src="/images/layout/menu-open.png"
          className="relative z-20 ml-4 block cursor-pointer text-primary"
          onClick={() => setOpen(!open)}
        />
      ) : (
        <img
          alt="menu-close"
          src="/images/layout/menu-close.png"
          className="relative z-20 ml-4 block cursor-pointer text-primary"
          onClick={() => setOpen(!open)}
        />
      )}

      <Transition
        show={open}
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="absolute top-4 right-2">
          <div className="relative">
            <img alt="bg-menu" src="/images/layout/bg-menu.png" className="min-h-[211px] min-w-[211px]" />
            <div className="absolute top-0 left-0 flex h-full w-full flex-col justify-between pt-14  pb-10 text-center">
              <div>
                {listMenu.map((menu, i) => {
                  return (
                    <Link key={i} href={menu.path}>
                      <div
                        onClick={() => setOpen(!open)}
                        className="bg-dropdown-item-hover mb-5 block cursor-pointer cursor-pointer whitespace-nowrap text-white"
                      >
                        <span
                          className={classNames(
                            'relative cursor-pointer text-xl uppercase',
                            router.pathname.replace('[lng]', i18n.activeLocale) === menu.path &&
                              'border border-primaryYellow py-1 px-3 text-primaryYellow',
                          )}
                        >
                          {menu.name}
                        </span>
                      </div>
                    </Link>
                  )
                })}
              </div>
              {!isAdmin && (
                <div>
                  <span
                    onClick={() => {
                      i18n.locale('en', EN)
                      setOpen(!open)
                    }}
                    className={classNames(i18n.activeLocale === 'en' && 'text-primaryYellow', 'cursor-pointer')}
                  >
                    EN
                  </span>
                  <span
                    onClick={() => {
                      i18n.locale('vi', VI)
                      setOpen(!open)
                    }}
                    className={classNames(i18n.activeLocale === 'vi' && 'text-primaryYellow', 'ml-10 cursor-pointer')}
                  >
                    VI
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Transition>
    </div>
  )
}

export default MenuMobile
