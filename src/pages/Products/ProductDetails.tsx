import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { ProductType, SelectedProduct } from "../../types/Types";
import { useDispatch } from "react-redux";
import { closeBackdrop, openBackdrop } from "../../redux/slice/appSlice";
import productService from "../../services/ProductService";
import { toast } from "react-toastify";
import RemoveCircleSharpIcon from "@mui/icons-material/RemoveCircleSharp";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import { Button, Typography } from "@mui/material";
import { setSelectedProducts } from "../../redux/slice/productSlice";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType>();
  const [count, setCount] = useState<number>(0);
  const dispatch = useDispatch();

  const minusProduct = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  const plusProduct = () => {
    setCount(count + 1);
  };

  const getProductByIdFromServer = async (productId: string) => {
    try {
      dispatch(openBackdrop());
      let response = await productService.getProductById(productId);
      if (response) {
        setProduct(response);
      }
    } catch (error: any) {
      toast.error(`Ürün Detayı Getirilirken Hata Oluştu ${error.message}`);
    } finally {
      dispatch(closeBackdrop());
    }
  };
  useEffect(() => {
    getProductByIdFromServer(String(id));
  }, []);

  const buy = () => {
    if (product) {
      let selectedProduct: SelectedProduct = {
        ...product,
        count,
      };
      dispatch(setSelectedProducts(selectedProduct));
    }
    setCount(0);
  };

  return (
    <div className="h-full shadow-lg !p-4 flex flex-col md:flex-row  md:gap-8  font-mono">
      <div>
        <img
          src={product?.image}
          className="w-full h-[200px] object-scale-down"
        />
      </div>
      <div className="flex justify-center items-center flex-col md:justify-start md:items-start">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold !mt-3 md:!mt-0 ">{product?.name}</h2>
       
        <p className="text-sm md:text-[16px] lg:text-[18px] !mt-5 text-justify">{product?.description}</p>
      
        <h4 className="!mt-5 text-md md:text-[20px] font-bold">{product?.price}₺</h4>
        <div className="!mt-5 flex items-center gap-2">
          <RemoveCircleSharpIcon
            onClick={minusProduct}
            sx={{ color: "black", fontSize: {xs:"14px" , sm:"20px",md:"25px"}, cursor: "pointer" }}
          />
          <span className="text-[16px] sm:text-[20px] md:text-[25px] cursor-default">{count}</span>
          <AddCircleSharpIcon
            onClick={plusProduct}
            sx={{ color: "black",fontSize: {xs:"14px" , sm:"20px",md:"25px"}, cursor: "pointer" }}
          />
        </div>
        <div className="!mt-5 ">
          <Button onClick={buy} variant="outlined" color="primary">
            {" "}
            Sepete Ekle
          </Button>
        </div>
      </div>
    </div>
  );
}
