import { newRidgeState } from "react-ridge-state";


export const cartState = newRidgeState(
  [],
  {
    onSet: (newState) => {
        localStorage.setItem('cart',JSON.stringify(newState));
    },
  }
);

// setInitialState fetches data from localStorage
function setInitialState() {
  try {
    const item = localStorage.getItem("cart");
    if (item) {
      const initialState = JSON.parse(item);
      cartState.set(initialState);
    }
  } catch (e) {}
}

// run function as application starts
setInitialState();