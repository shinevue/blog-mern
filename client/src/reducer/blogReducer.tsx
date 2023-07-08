import { Action } from "@reduxjs/toolkit";
import { READ_BLOG, READ_BLOG_ONE } from "../action/constants";
const initialState = {
  blogs: [],
  blog:{}
};

interface State {
  blogs: Array<any>;
  blog: Object;
}

interface Actiontype {
  type: string;
  payload: Object;
}

export default function Reducer(
  state: State = initialState,
  action: any
): State {
  switch (action.type) {
    case READ_BLOG:
      return {
        ...state,
        blogs: action.payload,
      };
    case READ_BLOG_ONE:
      return {
        ...state,
        blog: action.payload,
      };
    default:
      return state;
  }
}
