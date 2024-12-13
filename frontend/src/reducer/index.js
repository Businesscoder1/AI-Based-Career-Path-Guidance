import { combineReducers } from "@reduxjs/toolkit"

import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice"
import assessmentReducer from "../slices/assessmentSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  assessment: assessmentReducer,
})

export default rootReducer
