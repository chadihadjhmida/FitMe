import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { useQuery } from "@tanstack/react-query";
import { getClothes } from "../serves/ApiCloth";
import { useOrder } from "./useOrder";
import { useUser } from "./useUser";
import OrdersPage from "./OrdersPage";

export default function Orders() {
  const { currency } = useContext(ShopContext);

  const { user } = useUser();

  const { orders, isLoading: isLoadingO } = useOrder(user.id);
  console.log(orders);
  console.log(user.id);

  const {
    isLoading,
    data: products,
    error,
  } = useQuery({
    queryKey: ["cloths"],
    queryFn: getClothes,
    refetchInterval: 1_000,
  });

  if (isLoading) return <p>Loading...</p>;

  return <OrdersPage orders={orders} />;

  return (
    <div className="border-t pt-16 border-gray-300">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div>
        {products.slice(1, 4).map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b border-gray-300 text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex items-start gap-6 text-sm ">
              <img src={item.image[0]} className="w-16 sm:w-20 " />
              <div className="">
                <p className="sm:text-base font-medium">{item.name}</p>
                <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                  <p className="text-lg ">
                    {currency}
                    {item.price}.00
                  </p>
                  <p>Quantity: 1</p>
                  <p>Size: M</p>
                </div>
                <p className="mt-2">
                  Date:<span className="text-gray-400 "> 25, jul, 2025</span>
                </p>
              </div>
            </div>

            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                <p className="text-sm md:text-base">Ready to ship</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
