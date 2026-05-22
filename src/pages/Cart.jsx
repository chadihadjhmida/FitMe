import { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotale from "../components/CartTotale";
import { useQuery } from "@tanstack/react-query";
import { getClothes } from "../serves/ApiCloth";
import Spinner from "../components/Spinner";

export default function Cart() {
  const { currency, cartItems, updateQuantity, navigate, setCartItems } =
    useContext(ShopContext);

  const { isLoading, data: products } = useQuery({
    queryKey: ["cloths"],
    queryFn: getClothes,
  });

  console.log(products);

  // Convert cartItems to a flat array on the fly
  const cartData = Object.entries(cartItems || {}).flatMap(
    ([productId, sizes]) =>
      Object.entries(sizes)
        .filter(([size, qty]) => qty > 0)
        .map(([size, quantity]) => {
          // Find the product to get its price
          const product = products.find((p) => p._id == productId);

          return {
            _id: productId,
            size,
            quantity,
            price: product ? (product.price - product.discount) * quantity : 0, // fallback if not found
          };
        }),
  );

  console.log(`cart: `);
  console.log(cartData);

  if (isLoading) return <Spinner />;

  return (
    <div className="border-t pt-14 ">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>
      <div>
        {cartData.map((item) => {
          const product = products?.find((p) => p._id === Number(item._id));

          // Render placeholder if product not found yet
          return (
            <div
              key={item._id + item.size}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                {product?.image?.[0] ? (
                  <img className="w-16 sm:w-20" src={product.image[0]} />
                ) : (
                  <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gray-200 animate-pulse" />
                )}

                <div>
                  <p className="text-xs sm:text-lg font-medium">
                    {product?.name || "Loading..."}
                  </p>

                  <div className="flex items-center gap-5 mt-2 ">
                    <p>
                      {currency}
                      {product?.price - product?.discount ?? "--"}
                    </p>
                  </div>
                </div>
              </div>

              <input
                onChange={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? null
                    : updateQuantity(
                        item._id,
                        item.size,
                        Number(e.target.value),
                      )
                }
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                type="number"
                min={1}
                defaultValue={item.quantity}
              />

              <img
                onClick={() => updateQuantity(item._id, item.size, 0)}
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                src={assets.bin_icon}
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotale />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-black text-white text-sm my-8 px-8 py-3 cursor-pointer"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
