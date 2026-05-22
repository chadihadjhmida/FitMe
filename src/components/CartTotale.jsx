import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import { useQuery } from "@tanstack/react-query";
import { getClothes } from "../serves/ApiCloth";
import Spinner from "./Spinner";

export default function CartTotale() {
  const { currency, delivery_fee, cartItems } = useContext(ShopContext);

  const {
    isLoading,
    data: products,
    error,
  } = useQuery({
    queryKey: ["cloths"],
    queryFn: getClothes,
  });

  const getCartAmount = (pro) => {
    if (!pro) return 0; // wait until products exist
    let totalAmount = 0;

    for (const productId in cartItems) {
      const itemInfo = pro.find(
        (product) => String(product._id) === String(productId),
      );
      if (!itemInfo) continue; // skip if product not found yet

      for (const size in cartItems[productId]) {
        const quantity = cartItems[productId][size];
        if (quantity > 0) {
          // handle discount if any
          const price = itemInfo.discount
            ? itemInfo.price - (itemInfo.price * itemInfo.discount) / 100
            : itemInfo.price;

          totalAmount += price * quantity;
        }
      }
    }

    return totalAmount;
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="w-full ">
      <div className="text-2xl ">
        <Title text1={"CART"} text2={"TOTALE"} />
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm ">
        <div className="flex justify-between ">
          <p>Subtotale</p>
          <p>
            {currency}
            {getCartAmount(products)}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between ">
          <p>shipping Fee </p>
          <p>
            {currency} {delivery_fee}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between ">
          <b>TOTALE</b>
          <b>
            {currency}{" "}
            {getCartAmount(products) === 0
              ? 0
              : getCartAmount(products) + delivery_fee}
            .00
          </b>
        </div>
      </div>
    </div>
  );
}
