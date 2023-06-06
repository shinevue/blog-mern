import React, { useState, FormEvent, useEffect } from "react";
import Blog from "./blog/blog";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { TextField, Button, Fab } from "@mui/material";
import { AppDispatch } from "../app/store";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { useAppDispatch } from "../app/hooks";
import {
  addBlog,
  editBlog,
  deleteBlog,
  readBlog,
  addlike,
} from "../action/blogAction";
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import jwt_decode from "jwt-decode";
import { TypeTokenData } from "../action/actionType";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 480,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Profile = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const blue = {
    100: "#DAECFF",
    200: "#b6daff",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    900: "#003A75",
  };

  const grey = {
    50: "#f6f8fa",
    100: "#eaeef2",
    200: "#d0d7de",
    300: "#afb8c1",
    400: "#8c959f",
    500: "#6e7781",
    600: "#57606a",
    700: "#424a53",
    800: "#32383f",
    900: "#24292f",
  };

  const StyledInputElement = styled("input")(
    ({ theme }) => `
    width: 100%;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 24px ${
      theme.palette.mode === "dark" ? blue[900] : blue[100]
    };
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[600] : blue[200]
      };
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
  );
  const StyledTextarea = styled(TextareaAutosize)(
    ({ theme }) => `
    width: 100%;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[500] : blue[200]
      };
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
  );
  if (localStorage.length == 0)
    window.location.href = "http://localhost:3000/login";
  const decoded: TypeTokenData = jwt_decode(localStorage.token);
  const userID = decoded.id;
  const string = `http://localhost:8000/api/blog/add/${userID}`;
  console.log(string);

  const dispatch = useAppDispatch();
  const blogs = useSelector((state: RootState) => state.blog.blogs);
  useEffect(() => {
    dispatch(readBlog());
  }, []);
  console.log(blogs);

  return (
    <div className="container w-[90%] m-auto mt-32">
      <div className="flex justify-end m-10">
        <Fab variant="extended" onClick={handleOpen}>
          Add Blog
        </Fab>
      </div>

      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <form action={string} method="post">
          <Box sx={style}>
            <Typography
              id="keep-mounted-modal-title"
              variant="h6"
              component="h2"
            >
              Add Blog
            </Typography>
            <div className="m-3">
              <StyledInputElement placeholder="Title" name="title" required />
            </div>
            <div className="m-3">
              <StyledTextarea
                aria-label="minimum height"
                minRows={7}
                placeholder="Content"
                name="content"
                required
              />
            </div>

            <div className="m-3">
              <StyledInputElement
                type="url"
                placeholder="https://images.unsplash.com/photo-1501504905252-473c47e087f8"
                name="imgURL"
                required
              />
            </div>
            <div className="flex justify-end gap-5">
              <Button variant="contained" type="submit" color="secondary">
                Adding
              </Button>
              <Button variant="contained" color="warning" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </Box>
        </form>
      </Modal>
      <p className="text-3xl font-bold">Latest News</p>
      <div className="w-full m-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {blogs.map(
            (blog) =>
              blog.user_id == userID && (
                <Blog
                  key={blog._id}
                  id={blog._id}
                  imageURL={blog.imageURL}
                  title={blog.title}
                  content={blog.content}
                  like={blog.like}
                  watch={blog.watch}
                />
              )
          )}
        </div>
      </div>
    </div>
  );
};
export default Profile;
