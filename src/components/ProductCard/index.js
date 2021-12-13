import React from "react";

function ProductCard(props) {
  let { item } = props;
  return (
    <div class="card bordered   shadow-2xl">
      <img className="rounded-lg m-4 mx-8 shadow" src={props.img} />
      <div class="card-body">
        <h2 class="card-title">{item.name}</h2>
        <p
          class={`badge badge-${item.available ? "secondary" : "primary"} mb-4`}
        >
          {item.available ? "Available" : "Out Of Stock"}
        </p>
        <p className="text-4xl font-sans font-bold">${item.price}</p>
        <p className="text-xl badge badge-accent py-2 mt-4 ">{item.brand}</p>
        <p className="text-2xl py-2 mt-4 font-semibold ">
          Weight: <span>{item.weight} KG</span>
        </p>
        <div class="w-full card-actions">
          <button
            disabled={!item.available}
            onClick={props.onClick}
            class="w-full btn btn-primary"
            style={{ borderRadius: 0 }}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
