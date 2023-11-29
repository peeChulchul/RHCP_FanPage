import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { modulesLetters } from "redux/modules/letter";

const store = configureStore({
  reducer: {
    modulesLetters
  }
});

export const ReduxProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
