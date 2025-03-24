import React from "react";
import { Provider } from "react-redux";
import { store } from "./app/store"; // Ensure the store is correctly imported

interface ReduxProviderProps {
  children: React.ReactNode; // Accepting ReactNode as children
}

export const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
