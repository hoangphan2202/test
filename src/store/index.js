import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user'
import bannerReducer from './banner'
import videoReducer from './video'
import postReducer from './post'
import advisoryReducer from './advisory'
import imagesReducer from './images'
import partnersReducer from './partners'
import sponsorsReducer from './sponsors'

export function makeStore() {
  return configureStore({
    reducer: {
      user: userReducer,
      banner: bannerReducer,
      video: videoReducer,
      post: postReducer,
      advisory: advisoryReducer,
      images: imagesReducer,
      partners: partnersReducer,
      sponsors: sponsorsReducer,
    },
  })
}

const store = makeStore()

export default store
