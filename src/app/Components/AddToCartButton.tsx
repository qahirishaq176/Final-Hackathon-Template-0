"use client";
import { useCartStore } from "@/store/cartStore";
import { Product } from "../../../types/products";
import toast from "react-hot-toast"; // ✅ Import toast

interface AddToCartButtonProps {
  product: Product;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      _id: product.id, // Mapping `id` to `_id`
      name: product.name,
      price: product.price,
      imageUrl: product.image, // Mapping `image` to `imageUrl`
      quantity: 1,
    });

    // ✅ Show success toast
    toast.success(`${product.name} added to cart!`, {
      position: "top-right",
      duration: 3000,
      style: {
        background: "#333",
        color: "#fff",
      },
    });
  };

  return (
    <button
      onClick={handleAddToCart}
      className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
