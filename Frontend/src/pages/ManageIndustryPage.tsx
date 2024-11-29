import OrderItemCard from "@/@/components/OrderItemCard";
import {
  useCreateMyIndustry,
  useGetMyIndustry,
  useGetMyIndustryOrders,
  useUpdateMyIndustry,
} from "@/api/MyIndustryApi";

import ManageIndustryForm from "@/forms/manage-industry-form/ManageIndustryForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

const ManageIndustryPage = () => {
  const { createIndustry, isLoading: isCreateLoading } = useCreateMyIndustry();
  const { industry } = useGetMyIndustry();
  const { updateIndustry, isLoading: isUpdateLoading } = useUpdateMyIndustry();

  const { orders } = useGetMyIndustryOrders();

  const isEditing = !!industry;

  return (
    <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="manage-industry">Manage Industry</TabsTrigger>
      </TabsList>
      <TabsContent
        value="orders"
        className="space-y-5 bg-gray-50 p-10 rounded-lg"
      >
        <h2 className="text-2xl font-bold">{orders?.length} active orders</h2>
        {orders?.map((order) => (
          <OrderItemCard order={order} />
        ))}
      </TabsContent>
      <TabsContent value="manage-industry">
        <ManageIndustryForm
          industry={industry}
          onSave={isEditing ? updateIndustry : createIndustry}
          isLoading={isCreateLoading || isUpdateLoading}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ManageIndustryPage;
