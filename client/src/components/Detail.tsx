import { useAppDispatch } from "../app/hooks";
import { useState, FormEvent, useEffect } from "react";
import * as React from "react";
import { Button, Fab, Input, Modal } from "@mui/material";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { editBlog, deleteBlog, readBlog } from "../action/blogAction";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
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
const Detail = () => {
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
      border: 1px solid ${
        theme.palette.mode === "dark" ? grey[700] : grey[200]
      };
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
      border: 1px solid ${
        theme.palette.mode === "dark" ? grey[700] : grey[200]
      };
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
  const id = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(readBlog());
  }, []);
  const blogs = useSelector((state: RootState) => state.blog.blogs);

  let blog: any;

  console.log(blogs);
  blogs.map((blg) => {
    if (blg._id == id.id) blog = blg;
  });

  if (blog) localStorage.setItem("blog", blog);
  else blog = localStorage.getItem("blog");
  console.log(blog);
  

  const blogID = id.id;
  const string = `http://localhost:8000/api/blog/update/${blogID}`;
  const delItem = () => {
    dispatch(deleteBlog(id.id as string));
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setname] = useState("Loren Baker");
  
  return (
    <div className="w-2/5 text-lg m-auto mt-40 mb-10">
      <div className="flex justify-between">
        <p className="text-green-500 text-lg font-bold">SEJ ⋅ Content</p>
        <div className="flex gap-3">
          <Button variant="outlined" color="primary" onClick={handleOpen}>
            Edit
          </Button>
          <Button variant="outlined" color="secondary" onClick={delItem}>
            Delete
          </Button>
        </div>
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
              Edit Blog
            </Typography>
            <div className="m-3">
              <StyledInputElement
                defaultValue={blog.title}
                placeholder="Title"
                name="title"
                required
              />
            </div>
            <div className="m-3">
              <StyledTextarea
                aria-label="minimum height"
                minRows={7}
                placeholder="Content"
                name="content"
                defaultValue={blog.content}
                required
              />
            </div>

            <div className="m-3">
              <StyledInputElement
                type="url"
                placeholder="Image URL"
                name="imgURL"
                defaultValue={blog.imageURL}
                required
              />
            </div>
            <div className="flex justify-end gap-5">
              <Button variant="contained" type="submit" color="secondary">
                Edit
              </Button>
              <Button variant="contained" color="warning" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </Box>
        </form>
      </Modal>
      <h1 className="font-bold text-5xl my-7 capitalize">{blog.title}</h1>
      <p className="text-xl leading-8">{blog.content}</p>

      <div className="flex justify-between relative my-8">
        <div className="flex gap-8">
          <div className="mt-2">
            <img
              height="65"
              width="65"
              className="rounded-full"
              src="https://www.searchenginejournal.com/wp-content/uploads/2022/12/loren-baker-63a41d5965ac3-sej-65x65.jpg"
              alt={name}
            />
          </div>
          <div className="flex flex-col justify-start">
            <p className="text-green-500 text-sm font-bold">SEJ STAFF</p>
            <h2 className="text-2xl dark font-bold">{name}</h2>
            <p>June 2, 2023 ⋅ 2 min read</p>
          </div>
        </div>
        <div className="flex gap-4 mt-3">
          <div className="flex flex-col text-center">
            <span className="text-green-500 font-bold text-3xl">{blog.like}</span>
            <span className="uppercase text-xs font-bold">Likes</span>
          </div>
          <div className="flex flex-col text-center">
            <span className="text-green-500 font-bold text-3xl">{blog.watch}</span>
            <span className="uppercase text-xs font-bold">Reads</span>
          </div>
        </div>
      </div>
      <div>
        <img src={blog.imageURL} alt="Is content the king in modern?" />
      </div>
    </div>
  );
};

export default Detail;
