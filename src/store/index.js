import { configureStore } from '@reduxjs/toolkit'
import basicsReducer from './basics-slice'
import authReducer from './auth-slice'
import uiReducer from './ui-slice'

export default configureStore({
  reducer: {
    basics: basicsReducer,
    auth: authReducer,
    ui: uiReducer
  },
})