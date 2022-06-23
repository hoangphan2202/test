/* This example requires Tailwind CSS v2.0+ */
import classnames from 'classnames'
import { Fragment, useRef } from 'react'
import PropTypes from 'prop-types'
import { Dialog, Transition } from '@headlessui/react'

export default function ModalMap({ open, onClose, children, size, className }) {
  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root appear show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed inset-0 z-50 overflow-y-auto"
        initialFocus={cancelButtonRef}
        open={open}
        onClose={() => onClose && onClose()}
      >
        <div
          ref={cancelButtonRef}
          className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className={classnames(
                'inline-block w-full transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:align-middle',
                size === 'lg' && '!max-w-[1240px]',
                size === 'sm' && 'sm:max-w-md',
                className,
              )}
            >
              <div className="bg-transparent">{children}</div>
            </div>
          </Transition.Child>
        </div>
        <button className="absolute bottom-0 opacity-0" />
      </Dialog>
    </Transition.Root>
  )
}

ModalMap.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  children: PropTypes.node,
  size: PropTypes.string,
}
