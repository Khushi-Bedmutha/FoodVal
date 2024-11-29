import { Order } from "@/types";

type Props = {
    order: Order;
  };

  const OrderStatusDetail = ({ order }: Props) => {
    return  <div className="space-y-5">
        <div className="flex flex-col">
        <span className="font-bold">Delivering to:</span>
        <span>{order.deliveryDetails.name}</span>
        <span>
          {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
        </span>
        </div>
        <div className="flex flex-col">
        <span className="font-bold">Your Order</span>
        <span className="font-bold">Total</span>
        <span>Rs{(order.totalAmount / 100).toFixed(2)}</span>
        </div>
    </div>


}

  export default OrderStatusDetail;