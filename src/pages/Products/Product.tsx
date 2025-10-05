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
   <Card sx={{ width:300 }}>
      <img src={image}  className='w-full h-[120px] object-scale-down' />
      <CardContent sx={{height:"100px"}}>
        <Typography gutterBottom variant="h5" component="div">
         {name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
       {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button sx={{textTransform:"none"}} size="small">Ürün Detayına Git</Button>
     
      </CardActions>
    </Card>
  )
}
