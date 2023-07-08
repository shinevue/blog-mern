import React, { FormEvent } from "react";
import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../src/app/hooks";
import { loginUser } from "../../src/action/authAction";
import { TypeLoginData } from "../../src/action/actionType";
const Logine = () => {
  const [userdata, setuserdata] = useState<TypeLoginData>({
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setuserdata({ ...userdata, [e.target.name]: e.target.value });
  };
  const onsubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(loginUser(userdata));
    setuserdata({ ...userdata, email: "", password: "" });
  };
  return (
    <>
      <form onSubmit={onsubmit}>
        <div className="w-1/4 m-auto mt-52">
          <div className="w-full m-6">
            <TextField
              className="w-full"
              name="email"
              id="outlined-basic"
              label="Email:"
              variant="outlined"
              onChange={onchange}
            />
          </div>
          <div className="w-full m-6">
            <TextField
              className="w-full"
              name="password"
              type="password"
              id="outlined-basic"
              label="Password:"
              variant="outlined"
              onChange={onchange}
            />
          </div>
          <Button type="submit" variant="contained" className="ms-32">
            login
          </Button>
        </div>
      </form>
    </>
  );
};

export default Logine;
