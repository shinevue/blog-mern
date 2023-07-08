import { FormEvent } from "react";
import { useState } from "react";
import { TypeLoginData } from "../../action/actionType";
import { AppDispatch } from "../../app/store";
import { useAppDispatch } from "../../app/hooks";
import { registerUser } from "../../action/authAction";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [err, seterr] = useState("");
  const Validate = (
    name: String,
    email: String,
    password: String,
    confirm: String
  ) => {
    if (!name || !email || !password) {
      seterr("A field is empty!");
      return false;
    }
    if (password !== confirm) {
      seterr("Password isn't matched!");
      return false;
    }
    if (email.indexOf("@") < 0 || email.lastIndexOf(".") < email.indexOf("@")) {
      seterr("Invalid Email!");
      return false;
    }
    if (password.length < 6) {
      seterr("Password is too weak!");
      return false;
    }
    return true;
  };
  const onsubmit = (e: FormEvent) => {
    if (Validate(name, email, password, confirm)) {
      e.preventDefault();
      dispatch(
        registerUser({
          name: name,
          email: email,
          password: password,
          confirm: confirm,
        })
      );
      navigate("/login");
    }
  };
  return (
    <div className="group w-[405px] border-2 p-5 py-10 rounded-3xl bg-white m-auto my-32">
      <h1 className="text-black text-center">Sign Up</h1>
      <div className="m-5">
        <Box className="" sx={{ display: "flex", alignItems: "flex-end" }}>
          <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            className="w-96"
            label="UserName"
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Box>
      </div>
      <div className="m-5">
        <Box className="" sx={{ display: "flex", alignItems: "flex-end" }}>
          <EmailIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            className="w-96"
            label="Email"
            type="email"
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Box>
      </div>
      <div className="m-5">
        <Box className="" sx={{ display: "flex", alignItems: "flex-end" }}>
          <KeyIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            type="password"
            className="w-96"
            label="Password"
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Box>
      </div>
      <div className="m-5">
        <Box className="" sx={{ display: "flex", alignItems: "flex-end" }}>
          <KeyIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            type="password"
            className="w-96"
            label="Confirm"
            variant="standard"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </Box>
      </div>
      <div className="text-center">
        <Button variant="outlined" onClick={onsubmit}>
          Sign Up
        </Button>
      </div>
      <p className="text-[#ff0000]">{err}</p>
    </div>
  );
};

export default Register;
