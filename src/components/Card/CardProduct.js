"use client";
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { formatPrice } from "@/lib/utils";
import { CheckoutForm } from "../Forms/checkoutForms";
import useCartStore from "@/hook/useCartStore";
import { useAlert } from "@/hook/useAlert";
import { AlertComponent } from "../ui/AlertComponent";
import gsap, { Power1 } from "gsap";
import useFacebookPixel from "@/hook/usePixelFacebook";
export const CardProduct = ({ product }) => {
  const agregarProducto = useCartStore((state) => state.agregarProducto);
  const trackEvent = useFacebookPixel();

  const handleAddToCartClick = () => {

    const productData = {
      content_ids: [product._id],
      content_type: product.title,
      value: product.discountPrice,
      currency: "ARS",
    };

    trackEvent("AddToCart", productData);

    agregarProducto({
      title: product.title,
      price: product.discountPrice,
      images: product.images,
      _id: product._id,
    });

    
    gsap.to(".alerta", {
      display: "block",
      opacity: 1,
      ease: Power1.easeIn,
      delay: 0, // Inmediatamente después del clic
      onComplete: () => {
        gsap.to(".alerta", {
          delay: 1.5,
          opacity: 0,
          ease: Power1.easeOut,
          onComplete: () => {
            gsap.set(".alerta", { display: "none" });
          },
        });
      },
    });
  };

  return (
    <Card className="relative w-10/12 md:w-8/12 my-5 md:my-0 cursor-pointer h-fit rounded-lg overflow-hidden shadow-lg bg-white/90 border-none">
      <div className="flex justify-center">
        <img
          src={product.images[0]}
          alt={"productName"}
          layout="fill"
          objectFit="cover"
          className="rounded-xl h-[200px] mt-5 "
        />
      </div>
      <CardContent className="">
        <CardTitle className=" text-md mt-2 font-geist  ">
          {product.title}
        </CardTitle>
        <CardDescription className="flex justify-around mt-2">
          <span className="text-red-700 text-xl  mr-2 line-through	">
            {" "}
            {formatPrice(product.price)}
          </span>
          <span className="font-bold  text-xl ">
            {" "}
            {formatPrice(product.discountPrice)}
          </span>
        </CardDescription>

        <div className="flex items-center justify-around mt-5">
          <div className="my-1">
            <CheckoutForm
              total={product.discountPrice}
              products={[
                {
                  title: product.title,
                  price: product.price,
                  quantity: 1,
                },
              ]}
            />
          </div>
          <div className="my-1">
            <Button
              className="bg-black hover:bg-gray-800"
              onClick={handleAddToCartClick}
            >
              Agregar al carrito
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
