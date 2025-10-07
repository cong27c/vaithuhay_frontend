import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sliders: {
    SlideImageAlternative: { currentIndex: 0 },
  },
};

const sliderSlice = createSlice({
  name: "slider",
  initialState,
  reducers: {
    nextSlide: (state, action) => {
      const { name, maxIndex } = action.payload;
      const current = state.sliders[name].currentIndex || 0;
      state.sliders[name].currentIndex = (current + 1) % maxIndex;
    },
    prevSlide: (state, action) => {
      const { name, maxIndex } = action.payload;
      const current = state.sliders[name].currentIndex || 0;
      state.sliders[name].currentIndex = (current + (maxIndex - 1)) % maxIndex;
    },
    goToSlide: (state, action) => {
      const { name, index } = action.payload;
      state.sliders[name].currentIndex = index;
    },
  },
});
export const { nextSlide, prevSlide, goToSlide } = sliderSlice.actions;
export default sliderSlice.reducer;
