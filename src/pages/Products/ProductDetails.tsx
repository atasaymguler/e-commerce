import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import type { ProductType } from '../../types/Types'
import { useDispatch } from 'react-redux'
import { closeBackdrop, openBackdrop } from '../../redux/slice/appSlice'
import productService from '../../services/ProductService'
import { toast } from 'react-toastify'

export default function ProductDetails() {
    const {id} = useParams()
    const [product,setProduct] = useState<ProductType>()
    const dispatch = useDispatch()

    const getProductByIdFromServer = async(productId:string) => {

        try {
            dispatch(openBackdrop())
            let response = await productService.getProductById(productId)
            if(response){
                setProduct(response)
                console.log(response);
            }
            
        } catch (error:any) {
            toast.error(`Ürün Detayı Getirilirken Hata Oluştu ${error.message}`)
            
        }
        finally{
             dispatch(closeBackdrop())
        }

    }
    useEffect(()=>{
        getProductByIdFromServer(String(id))
    },[])

  return (
    <div>ProductDetails</div>
  )
}
