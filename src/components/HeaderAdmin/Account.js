import React from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useUser } from '../../store/user/hook'
import { FiLogOut } from 'react-icons/fi'
import { ADMIN_TOKEN } from '../../utils/storage'
import { useRouter } from 'next/router'

const Account = () => {
  const user = useUser()
  const router = useRouter()

  const handleLogout = () => {
    ADMIN_TOKEN.delete()
    router.push('/')
  }

  return (
    <Menu as="div" className="relative rounded-lg border border-primaryYellow px-2 py-2 sm:px-6 sm:py-4">
      <div>
        <Menu.Button className="flex max-w-xs items-center rounded-full text-sm focus:outline-none">
          <span className="sr-only">Open user menu</span>
          <div className="mr-2 text-left">
            <p>
              {user?.username.length > 20
                ? `${user?.username.slice(0, 7)}...${user?.username.slice(
                    user?.username.length - 7,
                    user?.username.length,
                  )}`
                : user?.username}
            </p>
          </div>
          <img
            className="ml-2 hidden h-8 w-8 rounded-full bg-white sm:block"
            src={'/images/user-default.png'}
            alt="avatar"
          />
        </Menu.Button>
      </div>
      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-black1 py-1 text-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            <p onClick={handleLogout} className="block cursor-pointer px-5 py-3 text-sm hover:text-primaryYellow">
              <FiLogOut className="mr-2 inline" size="1rem" />
              Đăng xuất
            </p>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default Account
