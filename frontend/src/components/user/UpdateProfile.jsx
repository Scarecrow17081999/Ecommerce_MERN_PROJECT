import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Metadata from "../layout/Metadata";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import "./UpdateProfile.css";
import { useToast } from "@chakra-ui/react";
import { Navigate, useNavigate } from "react-router-dom";
import Loader from "../layout/loader/Loader";
import { clearErrors, loadUser, updateUser } from "../../actions/userActions";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
const UpdateProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const toast = useToast();
  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  const [avatarPreview, setAvatarPreview] = React.useState("/profile.webp");
  const [avatar, setAvatar] = React.useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    const myform = new FormData();
    myform.set("name", name);
    myform.set("email", email);
    myform.set("avatar", avatar);
    dispatch(updateUser(myform));
  };
  const updateProfileDataChange = (e) => {
    e.preventDefault();

    if (e.target.name == "avatar") {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
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
    if (isAuthenticated == false) {
      navigate("/login");
    }
    if (user) {
      setName(user?.user?.name);
      setEmail(user?.user?.email);
      setAvatarPreview(user?.user?.avatar?.url);
    }
    if (error) {
      errorToast("lol");
      dispatch(clearErrors());
    }
    if (isUpdated) {
      console.log("profile updated successfully");
      dispatch(loadUser());
      navigate("/");
    }

    dispatch({
      type: UPDATE_USER_RESET,
    });
  }, [error, isUpdated, dispatch, user, isAuthenticated]);
  return (
    <>
      <Metadata title={"Update Profile"} />
      {loading ? (
        <Loader />
      ) : (
        <div className="updateProfileContainer">
          <div className="updateProfileBox">
            <h2 className="updateProfileHeading">Update Profile</h2>

            <form
              encType="muitipart/form-data"
              onSubmit={updateProfileSubmit}
              action=""
              className="updateProfileForm"
              // ref={updateProfileTab}
            >
              <div className="updateProfileName">
                <PersonIcon />
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="updateProfileEmail">
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
              <div id="updateProfileImage">
                <img src={avatarPreview} alt="avatar" />
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={updateProfileDataChange}
                />
              </div>
              <input
                type="submit"
                value={"Update"}
                className="updateProfileBtn"
                name=""
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateProfile;
