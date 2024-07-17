import { configureStore } from "@reduxjs/toolkit";
import userSlicer from "../module/login/redux/userSlicer";
import roleDataSlice from "../module/Role/redux/slice";
import userDataSlice from "../module/User/redux/slice";
import storiesSlicer from "../module/Stories/redux/allStory(admin)/storiesSlice";
import catagoiresSlicer from "../module/catagories/redux/slice";
import mystorieSlice from "../module/Stories/redux/myStory/slice";

const store = configureStore({
  reducer: {
    user: userSlicer,
    userData: userDataSlice,
    stories: storiesSlicer,
    role: roleDataSlice,
    catagories: catagoiresSlicer,
    mystory: mystorieSlice
  }
})

export default store;