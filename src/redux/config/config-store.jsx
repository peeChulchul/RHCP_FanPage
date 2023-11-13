import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { modulesLetters } from "redux/modules/letter";

const rootReducer = combineReducers({
  modulesLetters
});

const store = createStore(rootReducer);

export const ReduxProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
