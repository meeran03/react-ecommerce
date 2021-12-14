import React from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import { productState } from "../../contexts/productState";
import { cartState } from "../../contexts/cartState";
import Notification from "../../components/Notification";

function ProductDetail() {
  let { id } = useParams();
  let item = productState.useSelector((state) =>
    state.find((item) => item.id.toString() === id)
  );

  const [option, setOption] = React.useState(null);
  const [quantity, setQuantity] = React.useState(0);
  const [power, setPower] = React.useState(null);
  const [notification, setNotification] = React.useState({ open: false });
  const [disabled, setDisabled] = React.useState(false);

  let [cart, setCart] = cartState.use();

  const cartAdd = () => {
    let arr = cart;
    let obj = {};
    obj.id = id;
    // here we check if the item with such configurations already exists in the cart
    let clr =
      option.color.constructor === Array ? option.color[0] : option.color;
    // we are only checking for an item with same color power and id
    let prevItem = arr.find((t) => {
      if (t.id === id && t.color === clr) {
        if (t.power === power) {
          return t;
        }
      }
    });
    if (!prevItem) {
      if (option.storage) {
        obj.type = 2;
      }
      if (option.power) {
        obj.type = 1;
      }
      obj.color = clr;
      obj.cid = arr.length + 1;
      obj.quantity = quantity;
      obj.power = power;

      arr.push(obj);
      setCart(cart);
      setNotification({
        open: true,
        title: "Success",
        message: "Your Product Was succesfully Added To The Cart",
        type: "info",
      });
      setTimeout(() => {
        setNotification({ ...notification, open: false });
      }, 1500);
    } else {
      if (prevItem.quantity + quantity <= option.quantity) {
        prevItem.quantity = prevItem.quantity + quantity;
      } else {
        alert("Not Enough Items Available");
      }
    }
  };

  return (
    <div>
      <Header cart={cart} />
      <section class="text-gray-700 body-font overflow-hidden bg-white">
        <div class="px-5 py-24 mx-auto">
          <div class="justify-center grid grid-cols-2 gap-8">
            <div className="w-full justify-center flex">
              <img
                alt="ecommerce"
                class="lg:w-1/2 h-full w-full object-cover object-center rounded border border-gray-200"
                src={`https://picsum.photos/id/${item.id + 247}/300/200`}
              />
            </div>
            <div class="w-full p-8 lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 class="text-sm title-font text-gray-500 tracking-widest">
                {item.brand}
              </h2>
              <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">
                {item.name}
              </h1>
              <p class="leading-relaxed">
                {item.available ? "Available" : "Out of Stock"}
              </p>
              <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                <div class="flex">
                  <span class="mr-3">Color</span>
                  {item.options.map((item) => (
                    <button
                      onClick={() => {
                        setOption(item);
                      }}
                      disabled={item.quantity === 0}
                      class={`border-2 border-grey-300 rounded-full w-6 h-6 `}
                      style={{
                        backgroundColor: `${
                          item.color.constructor === Array
                            ? item.color[0]
                            : item.color
                        }`,
                      }}
                    ></button>
                  ))}
                </div>
                <div class="flex ml-6 items-center">
                  <span class="mr-3">Size</span>
                  <div class="relative">
                    <select
                      class="select select-bordered w-full max-w-xs"
                      onChange={(e) => {
                        setPower(e.target.value);
                        let prevItem = cart.find((t) => {
                          if (
                            t.id === id &&
                            t.color ===
                              (option.color.constructor === Array
                                ? option.color[0]
                                : option.color)
                          ) {
                            // if (t.power === e.target.value) {
                            return t;
                            // }
                          }
                        });
                        if (prevItem) setQuantity(prevItem.quantity);
                        if (prevItem && prevItem.quantity === option.quantity) {
                          setNotification({
                            open: true,
                            title: "Error",
                            message: "Not Enough Stock Available",
                            type: "danger",
                          });
                          setTimeout(() => {
                            setNotification({ ...notification, open: false });
                          }, 1500);
                          setDisabled(true);
                        }
                        else {
                          setDisabled(false)
                        }
                      }}
                    >
                      <option disabled="disabled" selected="selected">
                        Choose Size
                      </option>
                      {option &&
                        option.power &&
                        option.power.map((item) => (
                          <option value={item}>{item}</option>
                        ))}
                      {option &&
                        option.storage &&
                        option.storage.map((item) => (
                          <option value={item}>{item}</option>
                        ))}
                    </select>
                  </div>
                </div>

                <div class="flex ml-6 items-center">
                  <span class="mr-3">Quantity</span>

                  <input
                    type="number"
                    placeholder="Quantity"
                    class="input input-bordered"
                    disabled={power === null}
                    value={quantity}
                    onChange={(e) => {
                      if (e.target.value <= option.quantity)
                        setQuantity(parseInt(e.target.value));
                      else {
                        setNotification({
                          open: true,
                          title: "Error",
                          message: "Does Not Have Enough Available Stock",
                          type: "danger",
                        });
                        setTimeout(() => {
                          setNotification({ ...notification, open: false });
                        }, 1500);
                      }
                    }}
                  />
                </div>

              </div>
              <div class="flex flex-col">
                <span class="title-font font-medium text-2xl text-gray-900">
                  ${item.price}
                </span>

                <span class="title-font font-medium text-xl text-gray-300">
                  Weight: {item.weight}KG
                </span>
              </div>
              <button
                onClick={cartAdd}
                disabled={quantity === 0 || disabled}
                class=" mt-4 btn btn-sm btn-primary rounded"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </section>
      <Notification
        open={notification.open}
        title={notification.title}
        message={notification.message}
        type={notification.type}
      />
    </div>
  );
}

export default ProductDetail;
