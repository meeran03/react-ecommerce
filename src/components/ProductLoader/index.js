import React from "react";

function ProductLoader() {
  return (
    <div class="w-full h-24 border-2 rounded-md mx-auto mt-20">
      <div class="flex animate-pulse flex-col items-center h-full justify-center space-x-5">
        <div class="w-12 bg-gray-300 h-12 rounded-full "></div>
        <div class="flex flex-col space-y-3">
          <div class="w-36 bg-gray-300 h-6 rounded-md "></div>
          <div class="w-24 bg-gray-300 h-6 rounded-md "></div>
        </div>
      </div>
    </div>
  );
}

export default ProductLoader;
