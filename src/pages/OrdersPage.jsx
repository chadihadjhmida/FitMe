import { useState } from "react";
import Title from "../components/Title";

function OrderStatus({ status }) {
  const styles = {
    done: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    canceled: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        styles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}

export default function OrdersPage({ orders }) {
  const [openOrderId, setOpenOrderId] = useState(null);

  function toggleOrder(id) {
    setOpenOrderId((prev) => (prev === id ? null : id));
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">
        <Title text1={"My "} text2={"Orders"} />{" "}
      </h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-xl bg-white shadow-sm">
            {/* ORDER ROW */}
            <button
              onClick={() => toggleOrder(order.id)}
              className="w-full flex justify-between items-center p-4 rounded-xl hover:bg-gray-50 transition"
            >
              <div className="flex flex-col text-left">
                <span className="font-medium">Order #{order.id}</span>
                <span className="text-sm text-gray-500">
                  {new Date(order.created_at).toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center gap-6">
                <OrderStatus status={order.status} />
                <span className="font-semibold">${order.totalePrice}</span>
              </div>
            </button>

            {/* ORDER ITEMS */}
            {openOrderId === order.id && (
              <div className="border-t bg-gray-50 rounded-b-xl px-4 py-3">
                <div className="px-4 py-3 bg-gray-50">
                  <div className="space-y-3">
                    {order.order_items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 bg-white p-3 rounded-lg"
                      >
                        <img
                          src={item.clothes?.image}
                          alt={item.clothes?.name}
                          className="w-14 h-14 rounded-md object-cover"
                        />

                        <div className="flex-1">
                          <p className="font-medium">{item.clothes?.name}</p>
                          <p className="text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>

                        <p className="font-semibold">${item.price}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
