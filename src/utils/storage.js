/**
 * Handle get/set user token
 * @type {{get: (function()), set: (function(*=))}}
 */
export const ADMIN_TOKEN = {
  get: () => localStorage?.getItem('adminToken'),
  set: (newValue) => {
    localStorage?.setItem('adminToken', newValue.includes('Bearer') ? newValue : `Bearer ${newValue}`)
  },
  delete: () => localStorage?.removeItem('adminToken'),
}
