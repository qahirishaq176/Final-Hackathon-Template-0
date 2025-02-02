"use client";
import React, { useEffect, useState } from "react";
import AboveFooter from "../Components/AboveFooter";
import { Product } from "../../../types/products";
import { client } from "@/sanity/lib/client";
import { twenty } from "@/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

const Page = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const fetchedProducts: Product[] = await client.fetch(twenty);
        setProducts(fetchedProducts);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="p-6">
        <h1 className="text-[36px] sm:text-[40px] md:text-[48px] font-semibold text-center">
          Our Latest Products
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:p-6 mt-20 md:mt-10 lg:mt-5">
          {products.map((product) => (
            <div
              key={product.slug.current} // Use `_id` instead of `id` if that's what Sanity uses
              className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
            >
              <Link href={`/Shop/${product.slug.current}`}>
                {product.image && (
                  <img
                    src={urlFor(product.image).url()}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    ${product.price.toLocaleString("en-US")}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <AboveFooter />
    </>
  );
};

export default Page;