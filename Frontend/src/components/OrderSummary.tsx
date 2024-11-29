import { CardContent, CardHeader, CardTitle } from "@/@/components/card";
import { Industry } from "@/types";
import { Separator } from "@radix-ui/react-separator";



type Props = {
  industry: Industry;
};

const OrderSummary = ({ industry }: Props) => {
  

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span>Your Order for Waste</span>
          <span></span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>Rs{(industry.deliveryPrice).toFixed(2)}</span>
        </div>
        <Separator />
      </CardContent>
      
    </>
  );
};

export default OrderSummary;
