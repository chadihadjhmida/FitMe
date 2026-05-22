import supabase from "./supabase";

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase
    .from("users")
    .insert([{ fullname: fullName, email, password }])
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .eq("password", password)
    .single();

  if (error || !user) throw new Error("Invalid email or password");

  localStorage.setItem("user", JSON.stringify(user));

  return user;
}

export function getCurrentUser() {
  const storedUser = localStorage.getItem("user");

  if (!storedUser) return null;

  return JSON.parse(storedUser);
}
