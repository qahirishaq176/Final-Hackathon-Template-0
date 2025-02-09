export interface Product {
  _id: string; // Unique Product ID
  name: string; // Product name
  price: number; // Product price
  discountPercentage?: number; // Optional discount percentage
  stockLevel: number; // Stock availability
  category: string; // Product category
  description: string; // Product description
  slug: {
    _type: "slug";
    current: string;
  };
  imageUrl: string; // Product image URL from Sanity
}
