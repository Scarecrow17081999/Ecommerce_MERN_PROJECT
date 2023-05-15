import React from "react";
import Metadata from "../layout/Metadata";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../layout/loader/Loader";
import "./Profile.css";
const Profile = () => {
  const navigate = useNavigate();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  console.log(user, isAuthenticated);
  React.useEffect(() => {
    if (isAuthenticated == false) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  return (
    <>
      <Metadata title={"Profile"} />

      {loading ? (
        <Loader />
      ) : (
        <div className="profileContainer">
          <div>
            <h1>My Profile</h1>

            <img src={user?.user?.avatar.url} alt="User" />
            <Link to="/me/update">Edit Profile</Link>
          </div>
          <div>
            <div>
              <h1>Full name</h1>
              <p>{user?.user?.name}</p>
            </div>

            <div>
              <h1>Email</h1>
              <p>{user?.user?.email}</p>
            </div>
            <div>
              <h4>Joined On</h4>
              <p>{String(user?.user?.createdAt).substr(0, 10)}</p>
            </div>
            <div>
              <Link to="/orders">My Orders</Link>
              <Link to="/password/update">Change Password</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
