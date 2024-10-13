// hooks/usePlaceOrder.ts
import { useMutation } from "@tanstack/react-query";

interface OrderData {
  ticker: string;
  quantity: number;
  action: "buy" | "sell";
  price: number;
}

const placeOrder = async (order: OrderData) => {
  const response = await fetch(`http://127.0.0.1:5000/api/${order.action}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to place order");
  }

  return response.json();
};

export const usePlaceOrder = () => {
  return useMutation({
    mutationFn: placeOrder,
  });
};
