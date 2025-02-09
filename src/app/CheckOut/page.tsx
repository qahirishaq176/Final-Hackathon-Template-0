
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaChevronRight } from "react-icons/fa6";
import AboveFooter from "../Components/AboveFooter";
import { useCartStore } from "@/store/cartStore";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Swal from "sweetalert2";

const CheckoutPage = () => {
  const { items, totalPrice } = useCartStore();
  

  const [clientTotal, setClientTotal] = useState(0);
  useEffect(() => {
    setClientTotal(totalPrice);
  }, [totalPrice]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    streetAddress: "",
    zipCode: "",
    paymentMethod: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  function validateForm() {
    const newErrors: Record<string, string> = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) {
        newErrors[key] = "This field is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handlePlaceOrder() {
    if (!validateForm()) return;

    try {
      const order = {
        _type: "order",
        ...formData,
        cartItems: items.map((item: any) => ({
          _type: "reference",
          _ref: item._id,
          _key: item._id,
        })),
        total: clientTotal,
        status: "pending",
      };

      await client.create(order);

      Swal.fire({
        title: "🎉 Order Placed!",
        text: "Your order has been placed successfully.",
        icon: "success",
        confirmButtonColor: "#B88E2F",
      });

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        country: "",
        city: "",
        streetAddress: "",
        zipCode: "",
        paymentMethod: "",
      });
    } catch (error) {
      console.error("Error placing order:", error);
      Swal.fire({
        title: "❌ Order Failed!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  }

  return (
    <>
      {/* Header Section */}
      <div className="relative bg-[#FBEBB5]">
        <Image
          src="/Spic1.png"
          alt="pic1"
          width={1440}
          height={316}
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <Image src="/Spic2.png" alt="pic2" width={77} height={77} />
          <p className="font-[500] text-[48px] text-black">Checkout</p>
          <div className="text-[16px] text-gray-600 flex items-center space-x-1">
            <p>Home</p>
            <FaChevronRight className="text-gray-800" />
            <p>Checkout</p>
          </div>
        </div>
      </div>

      {/* Main Checkout Section */}
      <div className="flex flex-wrap gap-12 py-16 px-16 bg-white">
        {/* Billing Details */}
        <div className="flex-1 min-w-[300px]">
          <h2 className="text-[36px] font-[600] mb-6">Billing details</h2>
          <form className="space-y-6">
            {Object.entries(formData).map(([field, value]) => (
              <div key={field}>
                <label className="block mb-2 text-[16px] font-normal capitalize">
                  {field.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  type="text"
                  className={`w-full border p-4 rounded-md text-[16px] ${
                    errors[field] ? "border-red-500" : "border-gray-300"
                  }`}
                  value={value}
                  onChange={(e) =>
                    setFormData({ ...formData, [field]: e.target.value })
                  }
                />
                {errors[field] && (
                  <p className="text-red-500 mt-1">{errors[field]}</p>
                )}
              </div>
            ))}
          </form>
        </div>

        {/* Order Summary */}
        <div className="flex-1 min-w-[300px] p-6 border rounded-lg shadow-lg">
          <h2 className="text-[32px] font-[600] mb-6">Order Summary</h2>
          <div className="mb-8 text-[16px]">
            {items.map((item) => (
              <div className="flex justify-between items-center mb-4" key={item._id}>
                <Image
                  src={urlFor(item.imageUrl).url()}
                  alt={item.name}
                  height={100}
                  width={100}
                  className="w-[100px] h-[100px] object-cover rounded-md"
                />
                <p className="text-gray-600">{item.name} × {item.quantity}</p>
                <p className="font-semibold">${item.price * item.quantity}</p>
              </div>
            ))}
            <div className="flex justify-between text-gray-800 font-semibold mb-6">
              <p>Total</p>
              <p className="text-[24px] font-bold text-[#B88E2F]">
                ${clientTotal}
              </p>
            </div>
          </div>

          {/* Payment Method */}
          <h3 className="text-[20px] font-[600] mb-4">Payment Method</h3>
          <div className="space-y-4">
            {["bank", "cod"].map((method) => (
              <label
                key={method}
                className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer ${
                  formData.paymentMethod === method
                    ? "border-[#B88E2F] bg-[#FBEBB5]"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={method}
                  checked={formData.paymentMethod === method}
                  onChange={(e) =>
                    setFormData({ ...formData, paymentMethod: e.target.value })
                  }
                  className="hidden"
                />
                <div className="w-5 h-5 flex items-center justify-center border-2 border-gray-400 rounded-full">
                  {formData.paymentMethod === method && (
                    <div className="w-3 h-3 bg-[#B88E2F] rounded-full"></div>
                  )}
                </div>
                {method === "bank" ? "Direct Bank Transfer" : "Cash on Delivery"}
              </label>
            ))}
          </div>

          {/* Place Order Button */}
          <div className="flex justify-center mt-6">
            <button
              className="w-[318px] rounded-xl text-white bg-[#B88E2F] text-[20px] font-medium py-4 transition-all duration-300 ease-in-out hover:bg-[#8C6D24] shadow-lg"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>

      <AboveFooter />
    </>
  );
};

export default CheckoutPage;
