import { useState } from 'react'
import { Switch } from '@headlessui/react'

export default function Toggle({ toggle, item, api }) {
  const [enabled, setEnabled] = useState(toggle)
  const [isBusy, setIsBusy] = useState(false)
  const handleChange = async () => {
    setIsBusy(true)
    const formData = new FormData()
    const data = {
      openInNewTab: !enabled,
    }
    formData.append('data', JSON.stringify(data))
    try {
      await api.edit(item?._id, formData)
      setIsBusy(false)
      setEnabled(!enabled)
    } catch (err) {
      setIsBusy(false)
    }
  }
  return (
    <Switch.Group>
      <div className="flex items-center">
        <Switch
          disabled={isBusy}
          checked={enabled}
          onChange={handleChange}
          className={`${
            enabled ? 'bg-blue-600' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
        >
          <span
            className={`${
              enabled ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
          />
        </Switch>
      </div>
    </Switch.Group>
  )
}
