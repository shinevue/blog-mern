import React, { FormEvent } from "react";
import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../src/app/hooks";
import { registerUser } from "../../src/action/authAction";
import { TypeRegisterData } from "../../src/action/actionType";

const Register = () => {
  const [userdata, setuserdata] = useState<TypeRegisterData>({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const dispatch = useAppDispatch();
  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setuserdata({ ...userdata, [e.target.name]: e.target.value });
  };
  const onsubmit = (e: FormEvent) => {
    e.preventDefault();
    if (userdata.password === userdata.confirm) dispatch(registerUser(userdata));
  };

  return (
    <>
      <form onSubmit={onsubmit}>
        <div className="w-1/4 m-auto mt-52">
          <div className="w-full m-6">
            <TextField
              className="w-full"
              name="name"
              type="text"
              id="outlined-basic"
              label="Name:"
              variant="outlined"
              onChange={onchange}
            />
          </div>
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
          <div className="w-full m-6">
            <TextField
              className="w-full"
              name="confirm"
              type="password"
              id="outlined-basic"
              label="Re-password:"
              variant="outlined"
              onChange={onchange}
            />
          </div>
          <Button type="submit" variant="contained" className="ms-32">
            Register
          </Button>
        </div>
      </form>
    </>
  );
};

export default Register;
