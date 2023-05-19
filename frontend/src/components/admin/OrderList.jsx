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
  deleteOrder,
  getAllOrderDetails,
} from "../../actions/orderActions";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";
const OrderList = () => {
  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector((state) => state.allOrders);
  const {
    loading: deleteLoading,
    error: deleteError,
    isDeleted,
  } = useSelector((state) => state.orders);

  console.log(orders?.orders);
  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      console.log(deleteError);
      console.log("order deletion failed");
    }
    if (isDeleted) {
      console.log("order deletion successful");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrderDetails());
  }, [error, deleteError, isDeleted]);
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        if (params.row.status == "Processing") {
          return "redColor";
        }
        return "greenColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 150,
      flex: 0.5,
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
            <Link to={`/admin/orders/${params.id}`}>
              <ModeEditIcon />
            </Link>
            <Button
              onClick={() => {
                deleteOrderHandler(params.id);
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
  orders &&
    orders?.orders?.forEach((element) => {
      rows.push({
        id: element._id,
        status: element.orderStatus,
        itemsQty: element.orderItems.length,
        amount: `Rs.${element.totalPrice}`,
      });
    });

  return (
    <>
      <Metadata title="All Orders Admin" />
      {loading || deleteLoading ? (
        <Loader />
      ) : (
        <div className="dashboard">
          <Sidebar />
          <div className="productListContainer">
            {" "}
            <h1 id="productListHeading">ALL ORDERS</h1>
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

export default OrderList;
