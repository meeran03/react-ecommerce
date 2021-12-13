import React from "react";

function CartItem({ cart, setCart, ...props }) {
  let { pItem, item } = props;

  const changeQuantity = (type) => {
    let newItem = cart.find((it) => it.id === item.id && it.cid === item.cid);

    if (type == "+") {
      if (newItem.type === 1) {
        let opt = pItem.options.find((it) => it.color === newItem.color);
        if (newItem.quantity < opt.quantity)
          newItem.quantity = parseInt(newItem.quantity) + 1;
      } else if (newItem.type === 2) {
        let opt = pItem.options.find((clr) => clr.color[0] === newItem.color);
        if (newItem.quantity < opt.quantity)
          newItem.quantity = parseInt(newItem.quantity) + 1;
      }
    } else {
      if (newItem.quantity > 1)
        newItem.quantity = parseInt(newItem.quantity) - 1;
      else {
        setCart(cart.filter((it) => it.cid !== item.cid));
        return;
      }
    }
    setCart(
      cart.map((it) =>
        it.id === item.id && it.cid === item.cid ? newItem : it
      )
    );
  };
  return (
    <li class="grid grid-cols-6 gap-4 items-center border-b-1">
      <div class="col-span-1 self-center">
        <img
          src={`https://picsum.photos/id/${pItem.id + 247}/300/200`}
          alt={pItem.name}
          class="rounded w-full h-full"
        />
      </div>
      <div class="flex flex-col col-span-3 ">
        <span class="text-gray-600 text-md font-semi-bold">{pItem.name}</span>
        <span class="text-gray-400 text-sm inline-block pt-2">
          {pItem.brand}
        </span>
        <span
          class=" h-6 w-6 text-gray-400 text-sm border-2 border-black inline-block mt-2"
          style={{ backgroundColor: item.color }}
        ></span>
      </div>
      <div class="col-span-2 ">
        <div class="flex items-center space-x-2 text-sm justify-between">
          <span class="text-gray-400">
            {item.quantity} x ${pItem.price}
          </span>
          <span class="text-pink-400 font-semibold inline-block">
            ${item.quantity * pItem.price}
          </span>
        </div>
        <div className=" ">
          <div className="flex flex-row items-center justify-between mt-4">
            <button
              onClick={() => changeQuantity("-")}
              className="btn btn-md btn-accent  rounded text-xl"
            >
              -
            </button>
            <span className="font-semibold text-2xl">{item.quantity}</span>
            <button
              onClick={() => changeQuantity("+")}
              className="btn btn-md btn-accent  rounded text-xl"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
