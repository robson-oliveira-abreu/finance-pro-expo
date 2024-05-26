import { Toast } from "react-native-toast-notifications";
jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

jest.mock("react-native-toast-notifications", () => {
  return {
    Toast: {
      hide: jest.fn(),
      isOpen: jest.fn(),
      hideAll: jest.fn(),
      show: jest.fn(),
      update: jest.fn(),
    },
  };
});
