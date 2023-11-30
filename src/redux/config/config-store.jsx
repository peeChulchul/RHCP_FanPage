import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import modulesLetters from "redux/modules/letter";
import modulesModal from "redux/modules/modal";
import modulesAuth from "redux/modules/auth";
const store = configureStore({
  reducer: {
    modulesModal,
    modulesLetters,
    modulesAuth
  }
});
export const ReduxProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
