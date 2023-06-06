import { useEffect, useState } from "react";
import Blog from "./blog/blog";
import { useAppDispatch } from "../app/hooks";
import { readBlog, sortDB } from "../action/blogAction";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { minWidth } from "@mui/system";

interface Bloges {
  _id: String,
  title: String,
  content: String,
  imageURL: String,
  watch: Number,
  like: Number
}

const Dashboard = () => {
  if (localStorage.length == 0)
    window.location.href = "http://localhost:3000/login";
  const dispatch = useAppDispatch();
  const [tmp, setTmp] = useState<Bloges>({
    _id:'',
    title: '',
    content:'',
    imageURL: '',
    watch: 0,
    like: 0,
  });
  useEffect(() => {
    dispatch(readBlog());
  }, []);
  let blogs = useSelector((state: RootState) => state.blog.blogs);
  console.log(blogs);
  
  // setTmp(blogs);
  function handleChange(event: any) {
    switch (event.target.value) {
      case "like": {
        console.log("sort: like");
        blogs.sort((a, b) => b.like - a.like);
        break;
      }
      case "watch": {
        console.log("sort: watch");
        blogs.sort((a, b) => b.watch - a.watch);
        break;
      }
      case "date": {
        console.log("sort: date");
        blogs.sort((a, b) => b.date - a.date);
        break;
      }
      default: {
        console.log("fly to sky");
      }
      // setTmp(blogs);
    }
    console.log("change", blogs);
  }
  return (
    <div className="container w-[90%] m-auto mt-32">
      <div className="flex gap-20 ms-40">
        <p className="text-3xl font-bold text-white mt-3">Latest News</p>
          <FormControl size="small" sx={{minWidth:120}}>
            <InputLabel id="demo-simple-select-label">Sort</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              name="sort"
              label="Sort"
              onChange={(e) => handleChange(e)}
            >
              <MenuItem value="date">Date</MenuItem>
              <MenuItem value="like">Like</MenuItem>
              <MenuItem value="watch">Watch</MenuItem>
            </Select>
          </FormControl>
      </div>
      <div className="w-full m-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {blogs.map((blog) => (
            <Blog
              id={blog._id}
              key={blog._id}
              imageURL={blog.imageURL}
              title={blog.title}
              content={blog.content}
              like={blog.like}
              watch={blog.watch}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
