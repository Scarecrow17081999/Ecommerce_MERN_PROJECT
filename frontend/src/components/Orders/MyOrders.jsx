import React, { useEffect } from "react";
import LaunchIcon from "@mui/icons-material/Launch";
import "./myOrders.css";
import { DataGrid } from "@mui/x-data-grid";
import Metadata from "../layout/Metadata";
import Loader from "../layout/loader/Loader";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { myOrders } from "../../actions/orderActions";
import { Link } from "react-router-dom";
const MyOrders = () => {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(myOrders());
  }, []);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        if (params.row.status == "Processing") {
          return "greenColor";
        }
        return "redColor";
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
      field: "action",
      headerName: "Actions",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        console.log(params);
        return (
          <Link to={`/orders/${params.id}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((element, i) => {
      rows.push({
        id: element._id,
        itemsQty: element.orderItems.length,
        status: element.orderStatus,
        amount: `Rs. ${element.totalPrice}`,
      });
    });

  return (
    <>
      <Metadata title="My Orders" />
      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[10]}
            disableRowSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />
          <Typography id="myOrdersHeading">
            {" "}
            {`${user?.user?.name}'s Orders`}
          </Typography>
        </div>
      )}
    </>
  );
};

export default MyOrders;
