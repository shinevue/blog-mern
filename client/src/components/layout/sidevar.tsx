import React, { FormEvent } from "react";
import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { logoutUser } from "../../action/authAction";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const Sidebar = () => {
  return <></>;
};

export default Sidebar;
