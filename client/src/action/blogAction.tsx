import axios from "axios";
import {
  ADD_BLOG,
  BASE_URL,
  EDIT_BLOG,
  DELETE_BLOG,
  ADD_LIKE,
  WATCH_BLOG,
  READ_BLOG,
  READ_BLOG_ONE,
} from "./constants";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../app/store";
export const sortDB = (method: Object) => (dispatch: AppDispatch) => {
  console.log(method);
  axios
    .get(`${BASE_URL}/api/blog/sort`, method)
    .then((res) => {
      dispatch({
        type: READ_BLOG,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
export const readBlog = () => (dispatch: AppDispatch) => {
  axios
    .get(`${BASE_URL}/api/blog/read`)
    .then((res) => {
      dispatch({
        type: READ_BLOG,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const readBlogOne =
  (id: string | undefined) => (dispatch: AppDispatch) => {
    console.log("dsfasdfasdf");
    axios
      .get(`${BASE_URL}/api/blog/readone/${id}`)
      .then((res) => {
        dispatch({
          type: READ_BLOG_ONE,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
export const addBlog = (blogdata: Object) => (dispatch: AppDispatch) => {
  axios
    .post(`${BASE_URL}/api/blog/add`, blogdata)
    .then((res) => {
      dispatch({
        type: ADD_BLOG,
        payload: res.data,
      });
    })
    .catch((err) => {});
};

export const editBlog = (blogdata: Object) => (dispatch: AppDispatch) => {
  console.log("dasfdsaf");
  axios
    .post(`${BASE_URL}/api/blog/update`, blogdata)
    .then((res) => {
      dispatch({
        type: EDIT_BLOG,
      });
    })
    .catch((err) => {});
};

export const deleteBlog = (id:string) => (dispatch: AppDispatch) => {
  axios
    .delete(`${BASE_URL}/api/blog/delete/${id}`)
    .then((res) => {
      dispatch({
        type: DELETE_BLOG,
        payload: res.data,
      });
    })
    .catch((err) => {});
};

export const addlike = (id: String) => (dispatch: AppDispatch) => {
  axios
    .get(`${BASE_URL}/api/blog/like/${id}`)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {});
};

export const addwatch = (id: String) => (dispatch: AppDispatch) => {
  axios
    .get(`${BASE_URL}/api/blog/watch/${id}`)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {});
};
