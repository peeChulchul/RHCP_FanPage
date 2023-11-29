import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { modulesLetters } from "redux/modules/letter";
import modulesModal from "redux/modules/modal";
const store = configureStore({
  reducer: {
    modulesLetters,
    modulesModal
  }
});

export const ReduxProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
