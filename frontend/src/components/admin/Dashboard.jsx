import React, { useEffect } from "react";
import Sidebar from "./Sidebar.jsx";
import logo from "/logo.svg";
import { Link } from "react-router-dom";
import "./dashboard.css";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@mui/material/Typography";
import { Doughnut, Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { Chart } from "react-chartjs-2";
import { getAdminProducts } from "../../actions/productAction.jsx";
ChartJS.register(...registerables);

const Dashboard = () => {
  const dispatch = useDispatch((state) => state.products);

  useEffect(() => {
    dispatch(getAdminProducts());
  }, []);
  const { error, products, loading } = useSelector((state) => state.products);

  let outOfStock = 0;
  products &&
    products.forEach((element) => {
      if (element.stock == 0) {
        outOfStock += 1;
      }
    });
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],

    datasets: [
      {
        label: "Total Amount",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, 4000],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "In Stock"],
    datasets: [
      {
        // label: "Total Amount",
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products?.length - outOfStock],
      },
    ],
  };
  return (
    <>
      <div className="dashboard">
        <Sidebar />

        <div className="dashboardContainer">
          <Typography component={"h1"}> Dashboard</Typography>
          <div className="dashboardSummary">
            <div>
              <p>
                Total Amount <br />
                Rs.2000
              </p>
            </div>

            <div className="dashboardSummaryBox2">
              <Link to="/admin/products">
                <p>Products</p>
                <p>{products && products?.length}</p>
              </Link>
              <Link to="/admin/orders">
                <p>Orders</p>
                <p>30</p>
              </Link>
              <Link to="/admin/users">
                <p>Users</p>
                <p>30</p>
              </Link>
            </div>
          </div>

          <div className="lineChart">
            <Line datasetIdKey="id" data={lineState} />
          </div>
          <div className="doughnutChart">
            <Doughnut datasetIdKey="id" data={doughnutState} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
