
import type { ProductType } from '../../types/Types'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import { setControlModal, setDeleteProductModal, setProductToBeDeleted, setProductToBeUpdated, setUpdateProductModal } from '../../redux/slice/appSlice';
import { useState } from 'react';

type ProductPropsType = {
    product : ProductType
}

export default function Product({product} : ProductPropsType) {

    const {id,price,description,image,name} = product
    const {user} = useSelector((state:RootState)=> state.app)

    const dispatch = useDispatch()
    const deleteProduct = () => {
      dispatch(setDeleteProductModal(true))
      dispatch(setProductToBeDeleted(product))
    }
    const updateProduct = () => {
       dispatch(setProductToBeUpdated(product))
      dispatch(setControlModal({open:true,actionType:"update"}))
     
    }

  return (
   <Card sx={{ width:300,boxShadow:"1px 2px 3px lightgrey" , transition: 'all 0.5s ease-in-out', "&:hover": { boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' } }}>
      <img src={image}  className='w-full h-[100px] object-scale-down' />
      <CardContent sx={{height:"100px" ,}}>
        <Typography gutterBottom variant="h6" component="div">
         {name}
        </Typography>
        <Typography  variant="body2" sx={{  color: 'text.secondary',height:"100px" }}>
       {description}
        </Typography>
      </CardContent>
      <CardActions sx={{marginTop:"5px",paddingTop:"0",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <Button sx={{textTransform:"none",height:"60px"}} size="small">Ürün Detayına Git</Button>
        {
         user?.isAdmin &&   <div>
          <DeleteIcon onClick={deleteProduct} sx={{color:"#636e72" , "&:hover":{cursor:"pointer"}}} />
          <EditIcon onClick={updateProduct} sx={{color:"#636e72", "&:hover":{cursor:"pointer"}}} />
        </div>
        }
       
      </CardActions>
    </Card>
  )
}
