import { client } from '@/sanity/lib/client';


export async function getProducts() {
  try {
    const query = `*[_type == "product"]{
      _id,
      name,
      price,
      discountPercentage,
      isFeaturedProduct,
      stockLevel,
      category,
      description,
      "slug": slug.current,
      "imageUrl": image.asset._ref
    }[0...8]`;

    const products = await client.fetch(query);
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
  
export async function getProductBySlug(slug: string) {
  try {
    const query = `*[_type == "product" && slug.current == $slug][0]{
      _id,
      name,
      price,
      discountPercentage,
      isFeaturedProduct,
      stockLevel,
      category,
      description,
      "slug": slug.current,
      "imageUrl": image.asset._ref
    }`;

    const product = await client.fetch(query, { slug });
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}
