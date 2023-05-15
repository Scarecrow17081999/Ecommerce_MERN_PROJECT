import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Metadata from "../layout/Metadata";
import "./UpdatePassword.css";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Loader from "../layout/loader/Loader";
import LockIcon from "@mui/icons-material/Lock";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import {
  clearErrors,
  loadUser,
  updateUserPassword,
} from "../../actions/userActions";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
const UpdatePassword = ({ props }) => {
  //   console.log(props);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toast = useToast();
  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // if (isAuthenticated == false) {
  //   navigate("/login");
  // }

  const updatePasswordSubmit = (e) => {
    e.preventDefault();
    const myform = new FormData();
    myform.set("oldPassword", oldPassword);
    myform.set("newPassword", newPassword);
    myform.set("confirmPassword", confirmPassword);
    dispatch(updateUserPassword(myform));
  };
  const errorToast = (message) => {
    toast({
      title: "Request Error",
      description: message,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  };

  useEffect(() => {
    if (error) {
      errorToast("lol");
      dispatch(clearErrors());
    }
    if (isUpdated) {
      console.log("password updated successfully");
    }
    console.log(isUpdated);
    dispatch({
      type: UPDATE_PASSWORD_RESET,
    });
  }, [error, isUpdated, dispatch]);

  return (
    <>
      <Metadata title={"Update Password"} />
      {loading ? (
        <Loader />
      ) : (
        <div className="updatePasswordContainer">
          <div className="updatePasswordBox">
            <h2 className="updatePasswordHeading">Update Password</h2>

            <form
              encType="muitipart/form-data"
              onSubmit={updatePasswordSubmit}
              action=""
              className="updatePasswordForm"
              // ref={updatePasswordTab}
            >
              <div className="loginPassword">
                <LockIcon />
                <input
                  type="password"
                  name=""
                  placeholder="Old Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className="loginPassword">
                <VpnKeyIcon />
                <input
                  type="password"
                  name=""
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="loginPassword">
                <LockOpenIcon />
                <input
                  type="password"
                  name=""
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <input
                className="loginBtn"
                type="submit"
                value={"Login"}
                name=""
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdatePassword;
