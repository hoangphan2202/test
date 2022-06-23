import { useState } from 'react'
import { Switch } from '@headlessui/react'
import videoApi from 'api/videoApi'
import { useDispatch } from 'react-redux'
import { fetchAllVideosAsync } from 'store/video'

export default function Toggle({ toggle, item }) {
  const [enabled, setEnabled] = useState(toggle)
  const [isBusy, setIsBusy] = useState(false)
  const dispatch = useDispatch()

  const handleChange = async () => {
    setIsBusy(true)
    const data = {
      url: item?.url,
      isMainVideo: !enabled,
    }
    try {
      await videoApi.edit(item?._id, data)
      setIsBusy(false)
      setEnabled(!enabled)
      dispatch(fetchAllVideosAsync())
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
