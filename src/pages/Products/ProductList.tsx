import React, { useEffect, useState } from "react";
import type { ProductType } from "../../types/Types";
import productService from "../../services/ProductService";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { closeBackdrop, openBackdrop } from "../../redux/slice/appSlice";
import { toast } from "react-toastify";

import { Box, Pagination } from "@mui/material";
import type { AppDispatch, RootState } from "../../redux/store";
import { getProductByPage } from "../../redux/slice/productSlice";
import { useAppDispatch, useAppSelector } from "./hooks";

export default function ProductList() {
  const { products, productCount,page } = useAppSelector(
    (state: RootState) => state.product
  );
  const [currentPage, setCurrentPage] = useState<number>(page);

  const itemsPerPage = 8;

  const dispatch = useAppDispatch();
  const dispatch1 = useDispatch();
  
  const getAllProducts = async () => {
    try {
      dispatch1(openBackdrop());
      dispatch(
        getProductByPage({
          currentPage: currentPage,
          itemsPerPage: itemsPerPage,
        })
      );
  
    } catch (error: any) {
      toast.error(`Ürünler Getirilirken Hata Oluştu ${error.message}`);
    } finally {
      dispatch(closeBackdrop());
    }
  };

  useEffect(() => {
    getAllProducts();
  }, [currentPage]);

  const totalPages = Math.ceil(productCount / itemsPerPage); // Toplam sayfa sayısını hesapla, ürün sayısı / sayfa başına ürün sayısı

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
    localStorage.setItem("currentPage", JSON.stringify(value));
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <div className="flex justify-center items-center flex-wrap gap-5">
        {products &&
          products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
      </div>
      {/* MUI Pagination */}
      {totalPages >= 0 && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
          />
        </Box>
      )}
    </div>
  );
}
