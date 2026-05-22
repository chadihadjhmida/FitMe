import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import ReleatedProducts from "../components/ReleatedProducts";
import { useQuery } from "@tanstack/react-query";
import { getClothes } from "../serves/ApiCloth";
import TryOn from "./Tryon";

export default function Product() {
  const { productId } = useParams();
  const { currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("M");

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
      const item = products.find((p) => String(p._id) === String(productId));
      if (item) {
        setProductData(item);
        setImage(item.image[0]);
      }
    }
  }, [products, productId]);
  console.log(productData);

  const hasDiscount = productData.discount > 0;
  const finalPrice = hasDiscount
    ? productData.price - productData.discount
    : productData.price;

  return productData ? (
    <>
      <div className="pt-10 transition-opacity ease-in duration-500 opacity-100 ">
        <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row ">
          <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
            <div className="flex sm:flex-col  overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full ">
              {productData.image.map((item, index) => (
                <img
                  onClick={() => setImage(item)}
                  src={item}
                  key={index}
                  className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer rounded "
                />
              ))}
            </div>
            <div className="w-[500px] sm:w-[80%] justify-center align-middle items-center pl-6 ">
              <img className="w-[400px] h-[600px] rounded" src={image} />
            </div>
          </div>

          <div className="flex-1">
            <h1 className="font-bold text-2xl  mt-2">{productData.name}</h1>
            <div className="flex items-center gap-1  mt-2">
              <img src={assets.star_icon} className="w-3 5" />
              <img src={assets.star_icon} className="w-3 5" />
              <img src={assets.star_icon} className="w-3 5" />
              <img src={assets.star_icon} className="w-3 5" />
              <img src={assets.star_icon} className="w-3 5" />
              <p className="pl-2">(122)</p>
            </div>

            <div className="flex items-center gap-2">
              {hasDiscount && (
                <p className="mt-5 text-3xl font-bold line-through text-gray-400">
                  {currency}
                  {productData.price}
                </p>
              )}

              <p
                className={`mt-5 text-3xl font-bold ${
                  hasDiscount ? "text-red-500" : "text-gray-900"
                }`}
              >
                {currency}
                {finalPrice.toFixed(2)}
              </p>
            </div>

            <p className="mt-5 text-gray-500 md:w-4/5 font-semibold">
              {productData.description}
            </p>

            {productData.style && productData.style.length > 0 && (
              <div className="flex flex-col gap-4 my-8 ">
                <h3 className=" font-semibold  mb-2">Style</h3>
                <div className="flex flex-wrap gap-2">
                  {productData.style.map((style, index) => (
                    <span
                      key={index}
                      className="text-lg px-3 font-semibold py-1 bg-gray-200 text-gray-800 rounded-full"
                    >
                      {style}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => addToCart(productData._id, size)}
              className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 font-semibold"
            >
              ADD TO CART
            </button>
            <hr className="mt-8 sm:w-4/5 border-gray-400" />

            <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
              <p>100% Original product.</p>
              <p>Cash on delivery is available on this product.</p>
              <p>Easy return and exchange policy within 7 days.</p>
            </div>
          </div>
        </div>
        <TryOn image={image} />
        <ReleatedProducts type={productData.subCategory} />
      </div>
    </>
  ) : (
    <div className="opacity-0"></div>
  );
}
