import React, { useEffect } from "react";
import "./productList.css";
import { DataGrid } from "@mui/x-data-grid";
import Sidebar from "./Sidebar.jsx";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Metadata from "../layout/Metadata";
import Loader from "../layout/loader/Loader";
import {
  clearErrors,
  deleteUserByAdmin,
  getAllUsers,
} from "../../actions/userActions";
const UsersList = () => {
  const dispatch = useDispatch();

  const { error, users, loading, isDeleted, message } = useSelector(
    (state) => state.allUsers
  );

  const deleteUserHandler = (id) => {
    dispatch(deleteUserByAdmin(id));
  };

  useEffect(() => {
    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      console.log("order deletion successful");
      dispatch({ type: DELETE_ORDER_RESET });
    }
    dispatch(getAllUsers());
  }, [error, isDeleted]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 200, flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 0.7,
    },
    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 270,
      flex: 0.3,
      cellClassName: (params) => {
        if (params.row.role == "#admin") {
          return "greenColor";
        } else {
          return "redColor";
        }
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      minWidth: 150,
      flex: 0.5,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/user/${params.id}`}>
              <ModeEditIcon />
            </Link>
            <Button
              onClick={() => {
                deleteUserHandler(params.id);
              }}
            >
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];
  users &&
    users?.users?.forEach((element) => {
      rows.push({
        id: element._id,
        name: element.name,
        email: element.email,
        role: `#${element.role}`,
      });
    });

  return (
    <>
      <Metadata title="All Users Admin" />
      {loading ? (
        <Loader />
      ) : (
        <div className="dashboard">
          <Sidebar />
          <div className="productListContainer">
            {" "}
            <h1 id="productListHeading">ALL USERS</h1>
            <DataGrid
              rows={rows}
              columns={columns}
              disableRowSelectionOnClick
            />
          </div>
        </div>
      )}
    </>
  );
};

export default UsersList;
