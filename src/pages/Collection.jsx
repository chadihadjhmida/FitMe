import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import Productitem from "../components/Productitem";
import { useQuery } from "@tanstack/react-query";
import { getClothes } from "../serves/ApiCloth";
import Spinner from "../components/Spinner";

export default function Collection() {
  const [showFilter, setShowFilter] = useState(false);
  const { search, showSearch } = useContext(ShopContext);
  const [filterProducts, setFilterProducts] = useState([]);
  const [type, setType] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  const {
    isLoading,
    data: products,
    error,
  } = useQuery({
    queryKey: ["cloths"],
    queryFn: getClothes,
  });

  const toggleType = (e) => {
    if (type.includes(e.target.value)) {
      setType((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setType((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();
    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (type.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        type.includes(item.subCategory),
      );
    }
    setFilterProducts(productsCopy);
  };

  const sortProducts = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    setFilterProducts(products);
  }, []);

  useEffect(() => {
    applyFilter();
  }, [type, search, showSearch]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 ">
      <div className="min-w-60 ">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2 "
        >
          Filters
          <img
            src={assets.dropdown_icon}
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
          />
        </p>
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? "" : "hidden"} sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700 ">
            <p className="flex gap-2 ">
              <input
                type="checkbox"
                className="w-3 "
                value={"Topwear"}
                onChange={toggleType}
              />
              Topwear
            </p>
            <p className="flex gap-2 ">
              <input
                onChange={toggleType}
                type="checkbox"
                className="w-3 "
                value={"Bottomwear"}
              />
              Bottomwear
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 ">
        <div className="flex justify-between text-base sm:text-2xl mb-4 ">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2 "
          >
            <option value="relavent">Sort by : Relavent</option>
            <option value="low-high">Sort by : Low to High</option>
            <option value="high-low">Sort by : Hight to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <Productitem
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
              discount={item.discount}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
