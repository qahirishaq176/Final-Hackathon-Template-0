interface Order {
    id: string; // Unique order ID
    customer: {
      firstName: string;
      lastName: string;
      companyName?: string; // Optional
      country: string;
      streetAddress: string;
      city: string;
      province: string;
      zip: string;
      phone: string;
      email: string;
      additionalInfo?: string; // Optional
    };
    products: {
      id: string;
      name: string;
      quantity: number;
      price: number;
    }[];
    subtotal: number;
    total: number;
    paymentMethod: "bank_transfer" | "cash_on_delivery";
    orderDate: Date;
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  }
  
  export default Order;
  