import React from 'react'
import type { ProductType } from '../../types/Types'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

type ProductPropsType = {
    product : ProductType
}

export default function Product({product} : ProductPropsType) {

    const {id,price,description,image,name} = product

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
      <CardActions sx={{marginTop:"5px",paddingTop:"0"}}>
        <Button sx={{textTransform:"none",height:"60px"}} size="small">Ürün Detayına Git</Button>
     
      </CardActions>
    </Card>
  )
}
