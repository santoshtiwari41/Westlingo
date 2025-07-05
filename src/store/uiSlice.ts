import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ServiceType = "mock-test" | "preparation" | "test-booking";

export interface Course {
  id: string;
  name: string;
  category: string;
}

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  available: boolean;
}

export interface BookingDetails {
  groupSize: number;
  mode: "online" | "offline" | "hybrid";
  duration: "1-month" | "3-months" | "6-months" | "custom";
}

interface UIState {
  selectedService: ServiceType;
  selectedCourse: string | null;
  selectedDate: string;
  selectedTimeSlot: string | null;
  bookingDetails: BookingDetails;
}

const initialState: UIState = {
  selectedService: "preparation",
  selectedCourse: null,
  selectedDate: new Date().toISOString().split("T")[0],
  selectedTimeSlot: null,
  bookingDetails: {
    groupSize: 1,
    mode: "offline",
    duration: "1-month",
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setService(state, action: PayloadAction<ServiceType>) {
      state.selectedService = action.payload;
    },
    setCourse(state, action: PayloadAction<string>) {
      state.selectedCourse = action.payload;
    },
    setDate(state, action: PayloadAction<string>) {
      state.selectedDate = action.payload;
    },
    setTimeSlot(state, action: PayloadAction<string>) {
      state.selectedTimeSlot = action.payload;
    },
    setBookingDetails(state, action: PayloadAction<Partial<BookingDetails>>) {
      state.bookingDetails = { ...state.bookingDetails, ...action.payload };
    },
  },
});

export const {
  setService,
  setCourse,
  setDate,
  setTimeSlot,
  setBookingDetails,
} = uiSlice.actions;
export default uiSlice.reducer;
