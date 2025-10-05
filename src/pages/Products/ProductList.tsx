import React, { useEffect, useState } from 'react'
import type { ProductType } from '../../types/Types'
import productService from '../../services/ProductService';
import Product from './Product';
import { useDispatch } from 'react-redux';
import { closeBackdrop, openBackdrop } from '../../redux/slice/appSlice';
import { toast } from 'react-toastify';

import { Box, Pagination } from '@mui/material';

export default function ProductList() {

  // ! Json server yeni versiyonun da x total count olması gerekiyor ama gelmiyor bu yüzden npm uninstall json-server npm install json-server@0.17.4 --save-dev silip 0.17.4 indirdik.

  let [products,setProducts] =  useState<ProductType[]>([])
   const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const itemsPerPage = 8;
  const dispatch = useDispatch()
  console.log(currentPage);

  const getAllProducts = async () =>{
    try {
      dispatch(openBackdrop())
      let response= await productService.getAllProducts(currentPage,itemsPerPage)
      setProducts(response.data) // Ürün verileri sayfaya göre 
    const total = response.headers["x-total-count"];
  if (total) setTotalCount(parseInt(total, 10));
  
    } catch (error:any) {
      toast.error(`Ürünler Getirilirken Hata Oluştu ${error.message}`)
    }
    finally{
       dispatch(closeBackdrop())

    }
  }
  
  useEffect(()=>{
    getAllProducts()
  },[currentPage])

  const totalPages = Math.ceil(totalCount / itemsPerPage); // Toplam sayfa sayısını hesapla, ürün sayısı / sayfa başına ürün sayısı

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4">
    
    <div className='flex justify-center items-center flex-wrap gap-5'>
      {
        products && products.map((product) =>(
          <Product  key={product.id} product={product} />
        ))
      }
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
  )
}
