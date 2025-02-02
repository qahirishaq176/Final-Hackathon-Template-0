


export interface Product {
    id: string; // Product ka unique ID
    name: string; // Product ka naam
    price: number; // Product ki price
    imageUrl: string; // Product ka image URL
    description: string; // Product ka description
    slug: {
      _type: 'slug';
      current: string;
    };
  }
  