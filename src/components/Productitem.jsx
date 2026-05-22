import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

export default function Productitem({ id, image, name, price, discount }) {
  const { currency } = useContext(ShopContext);
  const hasDiscount = discount > 0;
  const finalPrice = hasDiscount ? price - discount : price;

  return (
    <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer">
      <div className="overflow-hidden justify-center items-center">
        <img
          src={image[0]}
          className="hover:scale-110 transition ease-in-out h-[250px] w-[200px] rounded"
        />
      </div>
      <p className="pt-3 pb-1 text-sm ">{name}</p>
      <div className="flex items-center gap-2">
        {hasDiscount && (
          <p className="text-sm font-bold line-through text-gray-400">
            {currency}
            {price}
          </p>
        )}

        <p
          className={`text-sm font-bold ${
            hasDiscount ? "text-red-500" : "text-gray-500"
          }`}
        >
          {currency}
          {finalPrice.toFixed(2)}
        </p>
      </div>{" "}
    </Link>
  );
}
