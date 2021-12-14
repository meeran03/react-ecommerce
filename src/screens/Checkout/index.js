import React from "react";
import { useHistory } from "react-router";
import CartItem from "../../components/CartItem";
import Header from "../../components/Header";
import Notification from "../../components/Notification";
import { cartState } from "../../contexts/cartState";
import { productState } from "../../contexts/productState";
import { updateProduct } from "../../services/updateProducts";

function Checkout() {
  const [cart, setCart] = cartState.use();
  const [products, setProducts] = productState.use();
  const [total, setTotal] = React.useState(0);
  const [notification, setNotification] = React.useState({ open: false });

  const history = useHistory()

  React.useEffect(() => {
    let final = 0;
    cart.map((item) => {
      final +=
        products.find((it) => it.id.toString() === item.id).price *
        item.quantity;
    });
    setTotal(final);
  }, [cart]);

  const performCheckout = () => {
    cart.forEach(async (cartItem) => {
      let pr = products.find((i) => i.id.toString() === cartItem.id);
      if (cartItem.type === 1) {
        let opt = pr.options.map((t) =>
          t.color === cartItem.color
            ? {
                ...t,
                quantity: t.quantity - cartItem.quantity,
              }
            : t
        );
        pr.options = opt;
      } else if (cartItem.type === 2) {
        let opt = pr.options.map((t) =>
          t.color[0] === cartItem.color
            ? {
                ...t,
                quantity: t.quantity - cartItem.quantity,
              }
            : t
        );
        pr.options = opt;
      }
      let available = false;
      pr.options.map((option) => {
        if (option.quantity > 0) available = true;
      });
      pr.available = available;
      await updateProduct(cartItem.id, pr);
    });
    setCart([]);
    setNotification({
      open: true,
      message: "Thank You for Buying",
      title: "Success",
      type: "success",
    });
    setTimeout(() => {
      history.push('/')
    },2000)
  };

  return (
    <div className="bg-white-100">
      <Header />
      {cart.length > 0 && (
        <div class="w-screen grid grid-cols-2">
          <div class="lg:col-span-1 col-span-2 bg-indigo-50 space-y-8 px-12">
            <div class="mt-8 p-4 relative flex flex-col sm:flex-row sm:items-center bg-white shadow rounded-md">
              <div class="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
                <div class="text-yellow-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 sm:w-5 h-6 sm:h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div class="text-sm font-medium ml-3">Checkout</div>
              </div>
              <div class="text-sm tracking-wide text-gray-500 mt-4 sm:mt-0 sm:ml-4">
                Complete your shipping and payment details below.
              </div>
            </div>
            <div class="rounded-md">
              <form id="payment-form">
                <section>
                  <h2 class="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
                    Shipping & Billing Information
                  </h2>
                  <fieldset class="mb-3 bg-white shadow-lg rounded text-gray-600">
                    <label class="flex border-b border-gray-200 h-12 py-3 items-center">
                      <span class="text-right px-2">Name</span>
                      <input
                        name="name"
                        class="focus:outline-none px-3"
                        placeholder="Try Abubakar"
                        required=""
                      />
                    </label>
                    <label class="flex border-b border-gray-200 h-12 py-3 items-center">
                      <span class="text-right px-2">Email</span>
                      <input
                        name="email"
                        type="email"
                        class="focus:outline-none px-3"
                        placeholder="abubakaryousaf3@gmail.com"
                        required=""
                      />
                    </label>
                    <label class="flex border-b border-gray-200 h-12 py-3 items-center">
                      <span class="text-right px-2">Address</span>
                      <input
                        name="address"
                        class="focus:outline-none px-3"
                        placeholder="10 Street Oslo, Norway"
                      />
                    </label>
                    <label class="flex border-b border-gray-200 h-12 py-3 items-center">
                      <span class="text-right px-2">City</span>
                      <input
                        name="city"
                        class="focus:outline-none px-3"
                        placeholder="San Francisco"
                      />
                    </label>
                    <label class="inline-flex w-2/4 border-gray-200 py-3">
                      <span class="text-right px-2">State</span>
                      <input
                        name="state"
                        class="focus:outline-none px-3"
                        placeholder="CA"
                      />
                    </label>
                    <label class="xl:w-1/4 xl:inline-flex py-3 items-center flex xl:border-none border-t border-gray-200 py-3">
                      <span class="text-right px-2 xl:px-0 xl:text-none">
                        ZIP
                      </span>
                      <input
                        name="postal_code"
                        class="focus:outline-none px-3"
                        placeholder="98603"
                      />
                    </label>
                    <label class="flex border-t border-gray-200 h-12 py-3 items-center relative">
                      <span class="text-right px-2">Country</span>
                      <div
                        id="country"
                        class="focus:outline-none px-3 w-full flex items-center"
                      >
                        <select
                          name="country"
                          class="rounded bg-transparent flex-1 cursor-pointer appearance-none focus:outline-none"
                          style={{ borderRadius: 0 }}
                        >
                          <option value="AU">Australia</option>
                          <option value="BE">Belgium</option>
                          <option value="BR">Brazil</option>
                          <option value="NW" selected="selected">
                            Norway
                          </option>
                          <option value="CN">China</option>
                          <option value="DK">Denmark</option>
                          <option value="FI">Finland</option>
                          <option value="FR">France</option>
                          <option value="DE">Germany</option>
                          <option value="HK">Hong Kong</option>
                          <option value="IE">Ireland</option>
                          <option value="IT">Italy</option>
                          <option value="JP">Japan</option>
                          <option value="LU">Luxembourg</option>
                          <option value="MX">Mexico</option>
                          <option value="NL">Netherlands</option>
                          <option value="PL">Poland</option>
                          <option value="PT">Portugal</option>
                          <option value="SG">Singapore</option>
                          <option value="ES">Spain</option>
                          <option value="TN">Tunisia</option>
                          <option value="GB">United Kingdom</option>
                          <option value="US">United States</option>
                        </select>
                      </div>
                    </label>
                  </fieldset>
                </section>
              </form>
            </div>
            <div class="rounded-md">
              <section>
                <h2 class="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
                  Payment Information
                </h2>
                <fieldset class="mb-3 bg-white shadow-lg rounded text-gray-600">
                  <label class="flex border-b border-gray-200 h-12 py-3 items-center">
                    <span class="text-right px-2">Card</span>
                    <input
                      name="card"
                      class="focus:outline-none px-3 w-full"
                      placeholder="Card number MM/YY CVC"
                      required=""
                    />
                  </label>
                </fieldset>
              </section>
            </div>
            <button
              onClick={performCheckout}
              class="btn btn-lg btn-success rounded my-8 "
            >
              Pay ${total}
            </button>
          </div>
          <div class="col-span-1 bg-white lg:block hidden">
            <h1 class="py-6 border-b-2 text-xl text-gray-600 px-8">
              Order Summary
            </h1>
            <ul class="py-6 border-b space-y-6 px-8">
              {cart.map((item) => {
                let pItem = products.find((p) => p.id.toString() === item.id);
                return (
                  <CartItem
                    cart={cart}
                    setCart={setCart}
                    pItem={pItem}
                    item={item}
                    setNotification={setNotification}
                  />
                );
              })}
            </ul>
            <div class="font-semibold text-xl px-8 flex justify-between py-8 text-gray-600">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>
        </div>
      )}
      {cart.length === 0 && (
        <div className='w-screen flex flex-col  overflow-y-auto justify-center items-center' >
          <img src="https://www.huratips.com/wp-content/uploads/2019/04/empty-cart.png" />
          <p className='my-4 font-bold text-5xl text-secondary' >Oops! Currently There are no Elements in the Cart</p>
        </div>
      )}
      <Notification
        open={notification.open}
        type={notification.type}
        title={notification.title}
        message={notification.message}
      />
    </div>
  );
}

export default Checkout;
