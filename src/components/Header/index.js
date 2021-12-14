import React from "react";
import { useHistory } from "react-router";
import {cartState} from '../../contexts/cartState'

function Header() {
  let [cart,setCart] = cartState.use()
  const history = useHistory()
  return (
    <div class="navbar mb-2 shadow-lg bg-primary text-neutral-content box">
      <div class="px-2 mx-2 navbar-start">
        <button onClick={() => history.push("/")} class="text-lg font-bold">abubakar store</button>
      </div>
      <div class="navbar-end">
        <button class="btn btn-square btn-ghost" onClick={() => history.push('/checkout')} >
          <span className='font-semi-bold ' >{cart.length}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            class="inline-block w-6 h-6 stroke-current"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Header;
