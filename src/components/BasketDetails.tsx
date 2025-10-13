import {  Button, Drawer, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../redux/store'
import { minusSelectedProduct, plusSelectedProduct, setBasketDrawer, setCalculetBasket } from '../redux/slice/productSlice'
import type { SelectedProduct } from '../types/Types'
import RemoveCircleSharpIcon from '@mui/icons-material/RemoveCircleSharp';
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import { useEffect } from 'react'
import { setBuyModal } from '../redux/slice/appSlice'

export default function BasketDetails() {

    const {basketDrawer,selectedProducts,calculetBasket} = useSelector((state:RootState)=> state.product)
    const dispatch = useDispatch()

    const closeBasketDetails = () => {
        dispatch(setBasketDrawer(false))
    }

    const plusProduct = (productId:string) => {
        dispatch(plusSelectedProduct(productId))
    }
     const minusProduct = (productId:string) => {
        dispatch(minusSelectedProduct(productId))
    }

    useEffect(()=>{
        dispatch(setCalculetBasket())
    },[selectedProducts])

    const openBuyModal = () => {
        dispatch(setBuyModal(true))
    }

  return (
    <>
       <Drawer open={basketDrawer} anchor='right' onClose={closeBasketDetails} >
       <div className='w-[40vw] md:w-[30vw] lg:w-[20vw] !p-2'>
        {
           selectedProducts.length ? 
           selectedProducts.map((product:SelectedProduct)=>(
            <div key={product.id} className='flex  items-center gap-1 !mt-5'>
                <div className='w-1/4'> <img className='w-[30px] sm:w-[40px] md:w-[50px] ' src={product.image}  /> </div>
                <div  className='w-1/4 text-center'>
                    <p className='text-[12px] sm:text-[14px] md:text-[16px]'>{product.name.substring(0,5)}</p>
                </div>
               
                <div className='w-1/4 text-center'>
                    <p className='text-[12px] sm:text-[14px] md:text-[16px]'>({product.count})</p>
                </div>
                <div className='w-1/4 flex items-center justify-end gap-2'>
                    <RemoveCircleSharpIcon  onClick={()=> minusProduct(product.id)}  sx={{color:"black",fontSize:{xs:"14px" , sm:"16px",md:"18px",lg:"20px"},cursor:"pointer"}} />

    <AddCircleSharpIcon onClick={()=> plusProduct(product.id)} sx={{color:"black",fontSize:{xs:"14px" , sm:"16px",md:"18px",lg:"20px"},cursor:"pointer"}} />
                </div>
            </div>
           ))
             
           :  <div className='!p-5 text-center text-[12px] sm:text-[14px] md:text-[16px]'>Hiç Ürün Yok :(</div> 
        }
        <div className='text-center text-[12px] sm:text-[14px] md:text-[16px] !mt-3'>
            Basket Tutarı : {calculetBasket.toFixed(2)}₺
        </div>
        <div className='text-center !mt-3'>
            <Button onClick={openBuyModal} disabled={selectedProducts.length < 1} sx={{textTransform:"none"}} variant='contained' size='small'>Satın Al</Button>
        </div>
       </div>
      </Drawer>
    </>
  )
}
