import React, { useEffect, useState } from "react";
import "./Products.css";
import Loader from "../layout/loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProducts } from "../../actions/productAction";
import ProductCard from "../home/ProductCard";
import { useParams } from "react-router-dom";
import { Slider } from "@mui/material";
import { Typography } from "@mui/material";
import ReactPaginate from "react-paginate";
import { useToast } from "@chakra-ui/react";
import Metadata from "../layout/Metadata";

const categories = [
  "laptop",
  "Footwear",
  "Bottom",
  "Top",
  "Attire",
  "Camera",
  "Smartphones",
];
const Products = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { name } = useParams();
  const [price, setPrice] = useState([0, 25000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const {
    loading,
    error,
    products,
    productCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const errorToast = (message) => {
    toast({
      title: "Request Error",
      description: message,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  const setCurrentPageNo = ({ selected }) => {
    setCurrentPage(selected);
  };
  useEffect(() => {
    if (error) {
      errorToast(error.message);
      dispatch(clearErrors());
    }
    dispatch(getProducts(name, price, currentPage, category, ratings));
  }, [dispatch, name, price, currentPage, category, ratings, error]);
  let count = filteredProductsCount;
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Metadata title={`PRODUCTS--ECOMMERCE`} />

          <h2 className="productsHeading">Products</h2>
          <div className="productContainer">
            <div className="filterBox">
              <Typography>Price</Typography>
              <Slider
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="no"
                aria-labelledby="range-slider"
                min={0}
                max={25000}
              />
              <Typography>Categories</Typography>
              <ul className="categoryBox">
                {categories?.map((e) => (
                  <li
                    className="category-link"
                    key={e}
                    onClick={() => setCategory(e)}
                  >
                    {e}
                  </li>
                ))}
              </ul>

              <fieldset style={{ padding: "0rem 1.5rem" }}>
                <Typography component="legend">Ratings Above</Typography>
                <Slider
                  value={ratings}
                  onChange={(e, newRating) => {
                    setRatings(newRating);
                  }}
                  aria-labelledby="contineous-slider"
                  min={0}
                  max={5}
                  valueLabelDisplay="auto"
                />
              </fieldset>
            </div>
            <div className="products">
              {products &&
                products.map((e, i) => <ProductCard key={i} product={e} />)}
            </div>
          </div>
          {resultPerPage < productCount && products.length > 0 && (
            <div className="paginationBox">
              <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                pageCount={Math.ceil(Number(productCount) / resultPerPage)}
                onClick={setCurrentPageNo}
                previousLabel="< prev"
                renderOnZeroPageCount={null}
                pageClassName="page-item"
                pageLinkClassName="page"
                activeClassName="pageItemActive"
                activeLinkClassName="pageLinkActive"
                containerClassName="pagination"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Products;
