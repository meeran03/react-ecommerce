import { newRidgeState } from "react-ridge-state";


export const productState = newRidgeState(
  [],
  {
    onSet: (newState) => {
        localStorage.setItem('products',JSON.stringify(newState));
    },
  }
);

function setInitialState() {
  try {
    const item = localStorage.getItem("products");
    if (item) {
      const initialState = JSON.parse(item);
      productState.set(initialState);
    }
  } catch (e) {}
}

// run function as application starts
setInitialState();