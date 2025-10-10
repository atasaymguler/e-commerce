import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { closeBackdrop, openBackdrop } from '../../redux/slice/appSlice';
import pastOrdersService from '../../services/PastOrdersService';
import type { RootState } from '../../redux/store';
import { useEffect, useState } from 'react';
import type { PastOrdersType, ProductType, SelectedProduct } from '../../types/Types';
import { toast } from 'react-toastify';

export default function PastOrders() {

    const dispatch = useDispatch()
    const {user} = useSelector((state:RootState)=> state.app)
    const [pastOrders,setPastOrders] = useState<PastOrdersType[]>([])

    const  getPastOrdersByIdFromServer = async () => {
       try {
        dispatch(openBackdrop())
       if(user?.id){
         let response = await pastOrdersService.getPastOrdersById(user?.id)
         if(response){
           setPastOrders(response)
         }
       }
        
       } catch (error:any) {

        toast.error(`Geçmiş Siparişler Getirilirken Hata Oluştu`)
        
       }
       finally{
         dispatch(closeBackdrop())
       }
    }

    useEffect(()=>{
        getPastOrdersByIdFromServer()
    },[])

  return (
    <div >
         <h1 className="text-3xl font-bold text-center !mb-3">Geçmiş Siparişler</h1>
  
     <div className='!my-3'>
   {
    pastOrders.length>0 ? pastOrders.map((pastOrder:PastOrdersType)=>(
      <div className='!my-3'>
  <TableContainer   component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="left" >
             Detaylar
            </TableCell>
            <TableCell colSpan={2} >
             Tarih : {pastOrder.date}
            </TableCell>
            <TableCell align="right">Fiyat</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Ürün</TableCell>
            <TableCell align="right">Fiyat</TableCell>
            <TableCell align="right">Adet</TableCell>
            <TableCell align="right">Toplam</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {
               pastOrder.items && pastOrder.items.map((product:SelectedProduct)=>(
         <TableRow key={product.id}>
              <TableCell><div className='flex items-center gap-3'>
                <img src={product.image} className='w-[40px] h-[40px]' />
                <span>{product.name}</span>
                </div></TableCell>
              <TableCell align="right">{product.price.toFixed(2)}₺</TableCell>
              <TableCell align="right">{product.count}</TableCell>
              <TableCell align="right">{(product.price*product.count).toFixed(2)}₺</TableCell>
            </TableRow>
               ))
              
            }
            
          <TableRow>
            <TableCell />
            <TableCell colSpan={2}>Toplam Tutar </TableCell>
            <TableCell align="right">{pastOrder.total.toFixed(2)}₺</TableCell>
          </TableRow>
       
        </TableBody>
      </Table>
    </TableContainer> 
      </div>
      
    )) : <div className='text-center !mt-6'>Geçmiş Siparişiniz Bulunmamaktadır. </div>
   }
    </div>

    </div>
   
  )
}
