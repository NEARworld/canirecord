"use server";

export async function createUser(formData: FormData) {
  console.log("create user!");
  console.log(Object.fromEntries(formData));
}
