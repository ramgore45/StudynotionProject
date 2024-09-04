import { combineReducers } from "@reduxjs/toolkit"

import authReducer from './slice/authslice'
import profileReducer from './slice/profileSlice'
import courseReducer from './slice/courseSlice'
import cartReducer from './slice/cartSlice'
import viewCourseReducer from './slice/viewCourseSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  course: courseReducer,
  cart: cartReducer,
  viewCourse: viewCourseReducer,
})

export default rootReducer
