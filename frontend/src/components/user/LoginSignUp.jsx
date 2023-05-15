import React, { useEffect, useRef } from "react";
import "./LoginSignUp.css";
import { Link, useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import { useSelector, useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { clearErrors } from "../../actions/userActions";
import { login, register } from "../../actions/userActions";
import Metadata from "../layout/Metadata";
import Loader from "../layout/loader/Loader";

const LoginSignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const [loginEmail, setLoginEMail] = React.useState("");
  const [loginPassword, setLoginPassword] = React.useState("");
  const [user, setUser] = React.useState({ name: "", email: "", password: "" });
  const [avatarPreview, setAvatarPreview] = React.useState("/profile.webp");
  const [avatar, setAvatar] = React.useState("");

  const { name, email, password } = user;

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    const myform = new FormData();
    myform.set("name", name);
    myform.set("email", email);
    myform.set("password", password);
    myform.set("avatar", avatar);
    dispatch(register(myform));
  };
  const registerDataChange = (e) => {
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
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
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
    if (error) {
      errorToast("lol");
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate("/");
    }
  }, [error, isAuthenticated]);
  const switchTab = (e, tab) => {
    e.preventDefault();
    if (tab == "Login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");
      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    } else if (tab == "Register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");
      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };
  return (
    <>
      <Metadata title={"Login"} />
      {loading ? (
        <Loader />
      ) : (
        <div className="LoginSignUpContainer">
          <div className="LoginSignUpBox">
            <div className="toggle_container">
              <div className="login_signUp_toggle">
                <p onClick={(e) => switchTab(e, "Login")}>LOGIN</p>
                <p onClick={(e) => switchTab(e, "Register")}>REGISTER</p>
              </div>
              <button ref={switcherTab}></button>
            </div>
            <form ref={loginTab} className="loginForm" onSubmit={loginSubmit}>
              <div className="loginEmail">
                <EmailIcon />
                <input
                  type="email"
                  name=""
                  placeholder="Email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEMail(e.target.value)}
                />
              </div>
              <div className="loginPassword">
                <LockIcon />
                <input
                  type="password"
                  name=""
                  placeholder="Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
              <Link to="/password/forgot">Forgot Password</Link>
              <input
                className="loginBtn"
                type="submit"
                value={"Login"}
                name=""
              />
            </form>
            <form
              encType="muitipart/form-data"
              onSubmit={registerSubmit}
              action=""
              className="signUpForm"
              ref={registerTab}
            >
              <div className="signUpName">
                <PersonIcon />
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => registerDataChange(e)}
                />
              </div>
              <div className="signUpEmail">
                <EmailIcon />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={registerDataChange}
                />
              </div>
              <div className="signUpPassword">
                <LockIcon />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={registerDataChange}
                />
              </div>
              <div id="registerImage">
                <img src={avatarPreview} alt="avatar" />
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={registerDataChange}
                />
              </div>
              <input
                type="submit"
                value={"SignUp"}
                className="signUpBtn"
                //   disabled={loading ? true : false}
                name=""
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginSignUp;
