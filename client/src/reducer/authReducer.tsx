import { Action } from "@reduxjs/toolkit";
import { SET_CURRENT_USER } from "../action/constants";
import { TypeTokenData } from "../action/actionType";
import { log } from "console";

interface initialState {
  isauth: boolean;
  user: TypeTokenData;
}

interface Actiontype {
  type: string;
  payload: TypeTokenData;
}

export default function Reducer<initialState, Actiontype>(
  state: initialState,
  action: Actiontype
) {
  switch (action) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isauth: action,
      };
    default:
      return "sd";
  }
}
