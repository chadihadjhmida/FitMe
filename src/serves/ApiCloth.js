import supabase, { supabaseUrl } from "./supabase";

export async function getClothes() {
  let { data, error } = await supabase.from("clothes").select("*");
  if (error) {
    console.error(error);
    throw new Error("Clothes could not be loaded");
  }
  return data.map((item) => ({
    _id: item.id,
    name: item.name,
    description: item.description,
    price: item.price,
    image: [item.image], // convert to array
    subCategory: item.subcategory || "Topwear",
    sizes: item.sizes || ["S", "M", "L", "XL"],
    style: item.style || [],
    date: new Date(item.created_at).getTime(),
    discount: item.discount,
  }));
}
