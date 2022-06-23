import PropTypes from 'prop-types'
import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { FiCheck, FiChevronDown } from 'react-icons/fi'
import classNames from 'classnames'

const SelectMenu = ({
  className,
  classNameButton,
  classNameMenuList,
  label,
  iconAppend,
  iconPrepend,
  menuList,
  onChange,
  value,
  size = 'sm',
  placeholder,
  disabled = false,
}) => {
  const [selected, setSelected] = useState(menuList[0])

  const handleChange = (value) => {
    setSelected(value)
    if (!!onChange) {
      onChange(value)
    }
  }

  useEffect(() => {
    if (value && value !== selected) {
      setSelected(value)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <Listbox value={selected} onChange={handleChange}>
      {label && <Listbox.Label className="block text-sm font-medium text-gray-700">{label}</Listbox.Label>}
      <div className={classNames(disabled && 'pointer-events-none opacity-70', 'relative', className)}>
        <Listbox.Button
          className={classNames(
            'relative w-full cursor-default rounded-md border border-gray-200 text-left shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm-md',
            size === 'lg' ? 'p-4' : 'py-2 pl-3 pr-3',
            classNameButton,
            iconAppend && 'pr-12',
          )}
        >
          <span className="flex items-center">
            {selected?.image && (
              <div className="relative h-6 w-6 rounded-full">
                <img
                  src={selected?.image}
                  alt="select-menu"
                  className="absolute top-1/2 left-1/2 h-full -translate-x-1/2 -translate-y-1/2 transform object-cover"
                />
              </div>
            )}
            {iconPrepend || ''}
            {selected?.icon || ''}
            <span className="ml-1 block truncate">{selected?.name || placeholder}</span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            {iconAppend && <FiChevronDown className="h-5 w-5" aria-hidden="true" />}
          </span>
        </Listbox.Button>

        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
          <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-black1 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {menuList.map((item, index) => (
              <Listbox.Option
                key={`select-memu-${index}`}
                className={({ active }) =>
                  classNames(
                    active ? 'bg-black text-white' : ' bg-black-3',
                    'relative cursor-pointer select-none py-2 pl-3 ',
                  )
                }
                value={item}
              >
                {({ selected, active }) => (
                  <>
                    <div className="flex items-center">
                      {item?.image && (
                        <div className="relative h-6 w-6 rounded-full">
                          <img
                            src={item?.image}
                            alt="select-menu"
                            className="absolute top-1/2 left-1/2 h-full -translate-x-1/2 -translate-y-1/2 transform object-cover"
                          />
                        </div>
                      )}
                      {item?.icon || ''}
                      <span
                        className={classNames(
                          selected ? 'font-semibold' : 'font-normal',
                          classNameMenuList,
                          'ml-3 block truncate',
                        )}
                      >
                        {item.name}
                      </span>
                    </div>

                    {selected ? (
                      <span
                        className={classNames(
                          active ? 'text-white' : 'text-primary',
                          'absolute inset-y-0 right-0 flex items-center pr-2',
                        )}
                      >
                        <FiCheck className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}

SelectMenu.propTypes = {
  className: PropTypes.string,
  classNameButton: PropTypes.string,
  classNameMenuList: PropTypes.string,
  label: PropTypes.string,
  iconAppend: PropTypes.bool,
  menuList: PropTypes.array,
  onChange: PropTypes.func,
  value: PropTypes.any,
  iconPrepend: PropTypes.any,
  size: PropTypes.oneOf(['lg', 'sm']),
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
}

export default SelectMenu
