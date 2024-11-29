export type User = {
    _id: string;
    email: string;
    name: string;
    addressLine1: string;
    city: string;
    country: string;
  };


  
  
export type Industry = {
    _id: string;
    user: string;
    industryName: string;
    city: string;
    country: string;
    deliveryPrice: number;
    estimatedDeliveryTime: number;
    imageUrl: string;
    lastUpdated: string;
  };

  export type OrderStatus =
  | "placed"
  | "paid"
  | "inProgress"
  | "outForDelivery"
  | "delivered";
  
  export type Order = {
    _id: string;
    industry: Industry;
    user: User;
    
    deliveryDetails: {
      name: string;
      addressLine1: string;
      city: string;
      email: string;
    };
    totalAmount: number;
    status: OrderStatus;
    createdAt: string;
    industryId: string;
  };




  export type IndustrySearchResponse = {
    data: Industry[];
    pagination: {
      total: number;
      page: number;
      pages: number;
    };
  };

  