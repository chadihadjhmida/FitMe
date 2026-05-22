import { useContext, useState } from "react";
import CartTotale from "../components/CartTotale";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import { createOrderWithItems } from "../serves/ApiOrder.js";
import toast from "react-hot-toast";
import { useUser } from "./useUser";
import { useQuery } from "@tanstack/react-query";
import { getClothes } from "../serves/ApiCloth";

export default function PlaceOrder() {
  const { user } = useUser();
  const { cartItems, clearCart } = useContext(ShopContext);

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

  const {
    isLoading,
    data: products,
    error,
  } = useQuery({
    queryKey: ["cloths"],
    queryFn: getClothes,
  });

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    zipcode: "",
    country: "",
    phone: "",
  });

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
  console.log(`this is in the orderplace : `);
  console.log(cartData);

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }
  async function handlePlaceOrder() {
    try {
      const orderData = {
        user_id: user.id, // from logged-in user
        totalePrice: getCartAmount(products), // from cart
        status: "on_progress",

        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        street: formData.street,
        city: formData.city,
        zipcode: Number(formData.zipcode),
        country: formData.country,
        phone: formData.phone,
      };

      await createOrderWithItems(orderData, cartData);

      toast.success("Order placed successfully");
      clearCart();
      navigate("/orders");
    } catch (err) {
      toast.error(err.message);
    }
  }

  const [method, setMethod] = useState("cod");
  const { navigate } = useContext(ShopContext);
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t ">
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELEVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First name"
            required
          />
          <input
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last name"
            required
          />
        </div>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email address"
          required
        />
        <input
          name="street"
          value={formData.street}
          onChange={handleChange}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Street"
          required
        />
        <div className="flex gap-3">
          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
            required
          />
          <input
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
            required
          />
        </div>
        <div className="flex gap-3">
          <input
            name="zipecode"
            value={formData.zipcode}
            onChange={handleChange}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="number"
            placeholder="ZipCode"
            required
          />
          <input
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
            required
          />
        </div>
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="number"
          placeholder="Phone"
          required
        />
      </div>

      <div className="mt-8 w-full mx-15">
        <div className="mt-8 min-w-8">
          <CartTotale />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border border-gray-300 p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5  rounded-full ${method === "cod" ? "bg-green-400" : ""}`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4 ">
                CACH ON DELEVERY
              </p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              onClick={handlePlaceOrder}
              className="bg-black text-white px-16 py-3 text-sm cursor-pointer"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
