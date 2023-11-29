const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  isOpen: false
};

const modulesModal = createSlice({
  name: "modal",
  initialState,
  reducers: {
    modalClose: (state, actions) => {
      state.isOpen = false;
    },
    modalOpen: (state, actions) => {
      state.isOpen = true;
    }
  }
});

export const { modalClose, modalOpen } = modulesModal.actions;
export default modulesModal.reducer;
