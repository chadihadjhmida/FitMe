import supabase from "./supabase";

export async function createOrderWithItems(orderData, cart) {
  // 1️⃣ Create the order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert([orderData])
    .select()
    .single();

  if (orderError) throw new Error(orderError.message);

  const orderId = order.id; // assuming your order table's primary key is 'id'

  // 2️⃣ Prepare the order items
  console.log(cart);
  const orderItems = cart.map((item) => ({
    order_id: orderId,
    cloth_id: item._id, // take the _id from the cart
    quantity: item.quantity,
    price: item.price,
  }));

  // 3️⃣ Insert order items
  const { data: itemsData, error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) throw new Error(itemsError.message);

  return { order, items: itemsData };
}

export async function getOrder(id) {
  console.log("test test");
  let query = supabase
    .from("orders")
    .select(
      `
      id,
      created_at,
      totalePrice,
      status,
      user_id,
      users (
        fullname,
        email
      ),
      order_items (
        id,
        price,
        quantity,
        order_id,
        clothes (
          id,
          name,
          image
        )
      )
    `,
      { count: "exact" },
    )
    .eq("user_id", parseInt(id))
    .order("created_at", { ascending: false });
  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Order not found");
  }
  return data;
}
