'use client';
import React, { useEffect, useState } from "react";
import AboveFooter from "../Components/AboveFooter";
import { Product } from "../../../types/products";
import { client } from "@/sanity/lib/client";
import { twenty } from "@/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

const page = () => {

const [product, setProduct] = useState<Product[]>([]);

useEffect(() => {
  async function fetchProduct() {
  const fetchProduct : Product[] = await client.fetch(twenty);
  setProduct(fetchProduct);  
  }
  fetchProduct();
},[]);

  return (
    <>
<div className="p-6">
<h1 className="text-[36px] sm:text-[40px] md:text-[48px] font-semibold text-center">Our Latest Products</h1>
      <div className="grid grid-cols-4 gap-6 p-6">
        {product.map((product) => (

          <div key={product.id}
          className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
          >
            <Link href={`/shop/${product.slug.current}`}> 
            {product.name}
            {product.image && (
              <img
              src={urlFor(product.image).url()}
                alt={product.name}
                className="w-full h-48 object-cover" />
                
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
        )      
        )}
</div>
      </div>
      <AboveFooter />
    </>
  );
};

export default page;
