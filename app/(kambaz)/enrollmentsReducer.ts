import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  enrollments: [] as any[],
};
const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, { payload }) => {
      state.enrollments = payload;
    },
    enroll: (state, { payload }) => {
      state.enrollments = [...state.enrollments, payload] as any;
    },
    unenroll: (state, { payload }) => {
      state.enrollments = state.enrollments.filter(
        (e: any) => !(e.user === payload.userId && e.course === payload.courseId)
      );
    },
  },
});
export const { enroll, unenroll, setEnrollments } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;