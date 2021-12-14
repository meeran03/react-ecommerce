import React from "react";
import Header from "../../components/Header";
import ProductCard from "../../components/ProductCard";
import SearchBar from "../../components/SearchBar";
import { getProducts } from "../../services/fetchProducts";
import { useHistory } from "react-router-dom";
import ProductLoader from "../../components/ProductLoader";

export default function HomePage(props) {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    getProducts().then((res) => {
      setData(res);
    });
  }, []);

  const history = useHistory();

  return (
    <div className="overflow-x-auto">
      <Header />
      <SearchBar data={data} setData={setData} />

      <div className="p-8 grid lg:grid-cols-4 grid-cols-1 md:grid-cols-2 w-screen gap-16 justify-center">
        {data &&
          data.map((item, index) => {
            return (
              <ProductCard
                img={`https://picsum.photos/id/${item.id + 247}/300/200`}
                item={item}
                onClick={() => history.push('product/' + item.id)}
              />
            );
          })}
        {data === null &&
          Array.from(Array(10).keys()).map((item) => <ProductLoader />)}
      </div>
    </div>
  );
}
