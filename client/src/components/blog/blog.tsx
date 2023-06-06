import { useContext, useState } from "react";
import IconButton from "@mui/material/IconButton";
import { ThumbUpOffAlt, VisibilityOutlined } from "@mui/icons-material";
import { addlike, addwatch } from "../../action/blogAction";
import { useAppDispatch } from "../../app/hooks";
import { Link } from "react-router-dom";

interface PropsType {
  id: string;
  title: string;
  content: string;
  watch: number;
  like: number;
  imageURL: string;
}

const Blog = (props: PropsType) => {
  const [like, setLike] = useState(props.like);
  const [watch, setWatch] = useState(props.watch);
  const [imgURL, setimgURL] = useState(props.imageURL);
  const dispatch = useAppDispatch();
  const addlikes = (id: string) => {
    dispatch(addlike(id));
  };
  const addwatches = (id: string) => {
    dispatch(addwatch(id));
  };
  const linkstring = `/detail/${props.id}`;
  return (
    <article id="all-none" className="w-96 m-16 bg-white">
      <div className="relative">
        <div className="w-full h-72">
          <Link
            title="Read the Article"
            className="w-full h-full hover:opacity-80"
            onClick={() => addwatches(props.id)}
            to={linkstring}
          >
            <img
              className="w-full h-full"
              src={imgURL}
              width="384"
              height="200"
              alt={imgURL}
            />
          </Link>
        </div>
        <div className="relative -top-9 p-3">
          <Link
            onClick={() => addwatches(props.id)}
            to={linkstring}
            title="Go to Author Page"
            className="relative left-7"
          >
            <img
              height="65"
              width="65"
              className="rounded-full"
              src="https://www.searchenginejournal.com/wp-content/uploads/2022/12/loren-baker-63a41d5965ac3-sej-65x65.jpg"
              alt="Loren Baker"
            />
          </Link>
          <h2 className="text-2xl dark mt-7 font-bold">
            <Link
              onClick={() => addwatches(props.id)}
              to={linkstring}
              title="Read the Article"
              className=""
            >
              {props.title}
            </Link>
          </h2>
          <p className="text-green-500 font-bold">
            <Link
              onClick={() => addwatches(props.id)}
              to={linkstring}
              title="Go to Author Page"
              className="green-link"
            >
              By Loren Baker
            </Link>
          </p>
          <p className="mt-3 truncate">{props.content}</p>
        </div>
        <div className="flex flex-row-reverse text-xl relative me-3">
          <div className="m-3">
            <VisibilityOutlined className="text-blue-600" />
            <label>{watch.toString()}</label>
          </div>
          <div className="m-2">
            <IconButton
              aria-label="like"
              onClick={() => {
                setLike(like + 1);
                addlikes(props.id);
              }}
            >
              <ThumbUpOffAlt className="text-blue-600" />
            </IconButton>

            <label>{like.toString()}</label>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Blog;
