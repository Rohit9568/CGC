// redux/features/courseSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state for courses
const initialState = {
  courses: [], // This will store the courses data
};

// Create slice for courses
const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload; // Update the courses array in the state
    },
  },
});

// Export the action
export const { setCourses } = courseSlice.actions;

// Selector to get courses from the Redux store
export const selectCourses = (state) => state.courses.courses;  // Access courses from the state

// Export the reducer to be added to the store
export default courseSlice.reducer;
