import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface UserInfo {
  name: string;
  email: string;
  phone: string;
}

export interface TestDetails {
  course: string;
  testType: string;
  date: string | null;
  time: string;
  slotId?: string;
  plan?: string;
}

export interface BookingState {
  userInfo: UserInfo;
  testDetails: TestDetails;
  isUserInfoComplete: boolean;
}

const initialState: BookingState = {
  userInfo: {
    name: "",
    email: "",
    phone: "",
  },
  testDetails: {
    course: "",
    testType: "",
    date: null,
    time: "",
    slotId: undefined,
  },
  isUserInfoComplete: false,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<Partial<UserInfo>>) {
      state.userInfo = { ...state.userInfo, ...action.payload };
      state.isUserInfoComplete = true;
    },
    setTestDetails(state, action: PayloadAction<Partial<TestDetails>>) {
      state.testDetails = { ...state.testDetails, ...action.payload };
    },
    resetBooking(state) {
      state.userInfo = initialState.userInfo;
      state.testDetails = initialState.testDetails;
      state.isUserInfoComplete = false;
    },
  },
});

export const { setUserInfo, setTestDetails, resetBooking } =
  bookingSlice.actions;
export default bookingSlice.reducer;
