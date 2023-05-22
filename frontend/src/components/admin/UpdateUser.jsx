import React, { useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "./Sidebar.jsx";
import Metadata from "../layout/Metadata";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import { Button } from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PersonIcon from "@mui/icons-material/Person";
import { useParams } from "react-router-dom";
import { getUsersDetails, updateUserByAdmin } from "../../actions/userActions";
import Loader from "../layout/loader/Loader";

const UpdateUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const { loading, error, user } = useSelector((state) => state.userDetails);

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (user && user._id !== id) {
      dispatch(getUsersDetails(id));
    } else {
      setName(user?.name);
      setEmail(user?.email);
      setRole(user?.role);
    }
    if (isUpdated) {
      console.log("user updated successfully");
      navigate("/admin/users");
    }
    if (updateError) {
      console.log("user update failed");
    }
  }, [isUpdated, updateError, id, error, user]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUserByAdmin(id, myForm));
  };

  const createProductImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImagePreview([]);
    setImages([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (reader.readyState == 2) {
          setImagePreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  return (
    <>
      <Metadata title="Update User" />

      <div className="dashboard">
        <Sidebar />

        {updateLoading || loading ? (
          <Loader />
        ) : (
          <div className="newProductContainer">
            <form
              onSubmit={createProductSubmitHandler}
              className="createProductForm"
              encType="multipart/form-data"
            >
              <h1>Update User</h1>

              <div>
                <PersonIcon />

                <input
                  type="text"
                  required
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <AlternateEmailIcon />

                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <VerifiedUserIcon />
                <select
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                disabled={
                  updateLoading ? true : false || role == "" ? true : false
                }
              >
                Update
              </Button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default UpdateUser;
