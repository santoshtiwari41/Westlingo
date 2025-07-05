import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SearchState {
  tab: string;
  location: string;
  dateRange: string;
  guests: string;
}

const initialState: SearchState = {
  tab: "Stays",
  location: "Pokhara",
  dateRange: "Tue 24 Jun — Wed 25 Jun",
  guests: "2 adults · 0 children · 1 room",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setTab: (state, action: PayloadAction<string>) => {
      state.tab = action.payload;
    },
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
    setDateRange: (state, action: PayloadAction<string>) => {
      state.dateRange = action.payload;
    },
    setGuests: (state, action: PayloadAction<string>) => {
      state.guests = action.payload;
    },
  },
});

export const { setTab, setLocation, setDateRange, setGuests } =
  searchSlice.actions;
export default searchSlice.reducer;
