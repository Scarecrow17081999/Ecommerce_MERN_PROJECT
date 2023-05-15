import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Metadata from "../layout/Metadata";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import "./ForgotPassword.css";
import { useToast } from "@chakra-ui/react";
import { Navigate, useNavigate } from "react-router-dom";
import Loader from "../layout/loader/Loader";
import {
  clearErrors,
  forgotUserPassword,
  loadUser,
  updateUser,
} from "../../actions/userActions";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const toast = useToast();
  const [email, setEmail] = useState("");
  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    const myform = new FormData();
    myform.set("name", name);

    dispatch(forgotUserPassword(myform));
  };

  useEffect(() => {
    if (error) {
      errorToast("lol");
      dispatch(clearErrors());
    }
    if (message) {
      console.log("profile updated successfully");
      dispatch(loadUser());
      navigate("/");
    }

    dispatch({
      type: UPDATE_USER_RESET,
    });
  }, [error, message, dispatch]);
  return (
    <>
      <Metadata title={"Forgot Password"} />
      {loading ? (
        <Loader />
      ) : (
        <div className="forgotPasswordContainer">
          <div className="forgotPasswordBox">
            <h2 className="forgotPasswordHeading">Forgot Password</h2>

            <form
              onSubmit={forgotPasswordSubmit}
              className="forgotPasswordForm"
            >
              <div className="forgotPasswordEmail">
                <EmailIcon />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <input
                type="submit"
                value={"Send Mail"}
                className="forgotPasswordBtn"
                name=""
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
