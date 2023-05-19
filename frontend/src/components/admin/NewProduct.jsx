import React, { useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "./Sidebar.jsx";
import Metadata from "../layout/Metadata";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import { Button } from "@mui/material";
import { createProduct } from "../../actions/productAction";
import { render } from "react-dom";
import StorageIcon from "@mui/icons-material/Storage";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
const categories = [
  "laptop",
  "Footwear",
  "Bottom",
  "Top",
  "Attire",
  "Camera",
  "Smartphones",
];
const NewProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState([]);
  const [images, setImages] = useState([]);
  const { loading, error, success } = useSelector(
    (state) => state.newProductRequest
  );

  useEffect(() => {
    // dispatch(n);
  }, []);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);
    myForm.set("price", price);
    images.forEach((image) => myForm.append("images", image));
    dispatch(createProduct(myForm));
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
      <Metadata title="Create New Product" />

      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form
            onSubmit={createProductSubmitHandler}
            className="createProductForm"
            encType="multipart/form-data"
          >
            <h1>Creare Product</h1>

            <div>
              <SpellcheckIcon />

              <input
                type="text"
                required
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />

              <input
                type="number"
                required
                placeholder="Product Price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <DescriptionIcon />
              <textarea
                type="text"
                required
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>
            <div>
              <AccountTreeIcon />
              <select
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>

                {categories &&
                  categories.map((item, i) => (
                    <option key={i} value={item}>
                      {item}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <StorageIcon />

              <input
                type="number"
                required
                placeholder="Stock"
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                multiple
                onChange={createProductImageChange}
              />
            </div>
            <div id="createProductFormImage">
              {imagePreview &&
                imagePreview.map((image, i) => (
                  <img key={i} src={image} alt={"avatar preview"} />
                ))}
            </div>
            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewProduct;
