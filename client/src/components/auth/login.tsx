import { FormEvent } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import Button from "@mui/material/Button";
import { useState } from "react";
import { TypeLoginData } from "../../action/actionType";
import { AppDispatch } from "../../app/store";
import { useAppDispatch } from "../../app/hooks";
import { loginUser } from "../../action/authAction";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [err, seterr] = useState("");
  const Validate = (
    email: String,
    password: String,
  ) => {
    if (!email || !password) {
      seterr("A field is empty!");
      return false;
    }
    if (email.indexOf("@") < 0 || email.lastIndexOf(".") < email.indexOf("@")) {
      seterr("Invalid Email!");
      return false;
    }
    seterr("");
    return true;
  };
  const onsubmit = async (e: FormEvent) => {
    if (Validate(email, password)) {
      dispatch(
        loginUser({
          email: email,
          password: password,
        })
      );
      if(localStorage.length) navigate("/dashboard");
    }
  };
  return (
    <div className="group w-[405px] border-2 p-5 py-10 rounded-3xl bg-white m-auto my-32">
      <h1 className="text-black text-center">Log In</h1>
      <div className="m-5">
        <Box className="" sx={{ display: "flex", alignItems: "flex-end" }}>
          <EmailIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            className="w-96"
            id="input-with-sx"
            label="Email"
            type="email"
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
      </div>
      <div className="m-5">
        <Box className="" sx={{ display: "flex", alignItems: "flex-end" }}>
          <KeyIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            type="password"
            className="w-96"
            id="input-with-sx"
            label="Password"
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
      </div>
      <div className="text-center mt-16">
        <Button variant="contained" onClick={onsubmit}>
          Log In
        </Button>
      </div>
      <div className="text-[#f73333]">{err}</div>
    </div>
  );
};

export default Login;
