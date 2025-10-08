import userService from "../services/UserService";
import type { RegisterUserType } from "../types/Types";

export const createId = async (): Promise<string> => {
  let index: number;
  let dataLength: number = (await userService.getAllUser()).length;
  if (dataLength > 0) {
    index = dataLength + 1;
  } else {
    index = 1;
  }
  return String(index);
};
