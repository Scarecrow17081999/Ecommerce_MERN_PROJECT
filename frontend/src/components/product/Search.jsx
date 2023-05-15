import React from "react";
import "./Search.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Metadata from "../layout/Metadata";
const Search = ({ history }) => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [keyword, setKeyword] = React.useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate("/products/" + keyword);
    } else {
      navigate("/products");
    }
  };
  return (
    <>
      <Metadata title={`Search A Product -- ECOMMERCE`} />
      <form className="searchBox" onSubmit={(e) => searchSubmitHandler(e)}>
        <input
          onChange={(e) => setKeyword(e.target.value)}
          type="text"
          placeholder="Search a Product ..."
          required
        />
        <input type="submit" value="search" name="" id="" />
      </form>
    </>
  );
};

export default Search;
