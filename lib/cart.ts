import { cookies } from "next/headers";
import type { Cart } from "@/types/cart";
import { CART_TOKEN_MAX_AGE, headers } from "./constants";

const EMPTY_CART_RESPONSE: Cart = {
  token: "",
  items: [],
  totalItems: 0,
  subtotal: 0,
  currency: "USD",
  createdAt: "",
  updatedAt: "",
} satisfies Cart;

async function createCartToken(cookieStore: Awaited<ReturnType<typeof cookies>>): Promise<string> {
  const res = await fetch(
    `${process.env.VERCEL_SWAG_STORE_API_ENDPOINT}/cart/create`,
    { method: "POST", headers: { ...headers } },
  );

  if (!res.ok) throw new Error("Failed to create cart");

  const { data } = await (res.json() as Promise<{ data: Cart }>);

  cookieStore.set("cart-token", data.token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: CART_TOKEN_MAX_AGE,
    secure: process.env.NODE_ENV === "production",
  });

  return data.token;
}

async function getOrCreateCartToken(): Promise<string> {
  const cookieStore = await cookies();
  const existing = cookieStore.get("cart-token")?.value;
  // Trust the cookie; if the token is rejected by a mutation endpoint the
  // caller will throw anyway. Re-validating here on every action doubles
  // API calls unnecessarily.
  if (existing) return existing;
  return createCartToken(cookieStore);
}

export async function getCart() {
  const cookieStore = await cookies();
  const token = cookieStore.get("cart-token")?.value;

  if (!token) {
    return {
      data: EMPTY_CART_RESPONSE,
    };
  }

  const res = await fetch(
    `${process.env.VERCEL_SWAG_STORE_API_ENDPOINT}/cart`,
    {
      headers: {
        ...headers,
        "x-cart-token": token,
      },
    },
  );

  if (!res.ok) {
    return {
      data: EMPTY_CART_RESPONSE,
    };
  }

  return res.json() as Promise<{ data: Cart }>;
}

export async function addItemToCart(productId: string, quantity: number) {
  const token = await getOrCreateCartToken();

  const res = await fetch(
    `${process.env.VERCEL_SWAG_STORE_API_ENDPOINT}/cart`,
    {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
        "x-cart-token": token,
      },
      body: JSON.stringify({ productId, quantity: quantity }),
    },
  );

  if (!res.ok) throw new Error("Failed to add item to cart");

  return res.json() as Promise<{ data: Cart }>;
}

export async function removeItemFromCart(productId: string) {
  const token = await getOrCreateCartToken();

  const res = await fetch(
    `${process.env.VERCEL_SWAG_STORE_API_ENDPOINT}/cart/${productId}`,
    {
      method: "DELETE",
      headers: {
        ...headers,
        "x-cart-token": token,
      },
    },
  );

  if (!res.ok) throw new Error("Failed to remove item from cart");

  return res.json() as Promise<{ data: Cart }>;
}

export async function updateItemQuantity(productId: string, quantity: number) {
  const token = await getOrCreateCartToken();

  const res = await fetch(
    `${process.env.VERCEL_SWAG_STORE_API_ENDPOINT}/cart/${productId}`,
    {
      method: "PATCH",
      headers: {
        ...headers,
        "Content-Type": "application/json",
        "x-cart-token": token,
      },
      body: JSON.stringify({ quantity: quantity }),
    },
  );

  if (!res.ok) throw new Error("Failed to update item quantity");

  return res.json() as Promise<{ data: Cart }>;
}
