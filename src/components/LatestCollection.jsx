import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import Productitem from "./Productitem";
import { useQuery } from "@tanstack/react-query";
import { getClothes } from "../serves/ApiCloth";

export default function LatestCollection() {
  const [latestPorducts, setLatestProducts] = useState([]);

  const {
    isLoading,
    data: products,
    error,
  } = useQuery({
    queryKey: ["cloths"],
    queryFn: getClothes,
  });

  useEffect(() => {
    if (products) {
      setLatestProducts(products.slice(-5).reverse());
    }
  }, [products]);

  return (
    <div className="my-10 ">
      <div className="text-center py-8 text-3xl ">
        <Title text1={"LATEST"} text2={"COLLECTION"} />
        <p className="w3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          The greatest clothes with the best quality only for you !!!
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestPorducts.map((item, index) => (
          <Productitem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
            discount={item.discount}
          />
        ))}
      </div>
    </div>
  );
}
