import React, { useEffect } from "react";
import "./productList.css";
import { DataGrid } from "@mui/x-data-grid";
import Sidebar from "./Sidebar.jsx";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct, getAdminProducts } from "../../actions/productAction";
import { Link } from "react-router-dom";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Metadata from "../layout/Metadata";
import Loader from "../layout/loader/Loader";
const ProductList = () => {
  const dispatch = useDispatch();

  const { error, products, loading } = useSelector((state) => state.products);
  const {
    error: deleteError,
    loading: deleteLoading,
    isDeleted,
  } = useSelector((state) => state.manupulateProducts);
  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    dispatch(getAdminProducts());
  }, [deleteError, isDeleted]);
  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      type: "number",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 200,
      flex: 0.3,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
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
            <Link to={`/admin/product/${params.id}`}>
              <ModeEditIcon />
            </Link>
            <Button
              onClick={() => {
                deleteProductHandler(params.id);
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
  products &&
    products.forEach((element) => {
      rows.push({
        id: element._id,
        name: element.name,
        stock: element.stock,
        price: `Rs.${element.price}`,
      });
    });

  return (
    <>
      <Metadata title="All Products Admin" />
      {loading || deleteLoading ? (
        <Loader />
      ) : (
        <div className="dashboard">
          <Sidebar />
          <div className="productListContainer">
            {" "}
            <h1 id="productListHeading">ALL PRODUCTS</h1>
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

export default ProductList;
