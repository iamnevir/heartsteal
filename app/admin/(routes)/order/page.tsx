"use client";
import OrderManager from "@/components/admin/order/order-manager";
import { useUser } from "@clerk/nextjs";

const OrderPage = () => {
  const { user } = useUser();
  if (!user?.id) {
    return null;
  }
  return (
    <div>
      <OrderManager userId={user.id} />
    </div>
  );
};

export default OrderPage;
