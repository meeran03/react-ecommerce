import _ from "lodash";
import React from "react";
import { searchProducts } from "../../services/fetchProducts";

function SearchBar({ setData, ...props }) {
  const onChange = _.debounce((query) => {
    searchProducts(query).then((res) => {
      setData(res);
    });
  }, 500);
  return (
    <div className=" justify-center flex  p-8">
      <div class="form-control">
        <label class="label">
          <span class="label-text">Search Products</span>
        </label>
        <div class="relative">
          <input
            type="text"
            placeholder="Search"
            class="w-full pr-16 input input-primary rounded input-bordered"
            onChange={(e) => onChange(e.target.value)}
          />
          <button class="absolute top-0 right-0 rounded btn btn-primary">
            go
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
