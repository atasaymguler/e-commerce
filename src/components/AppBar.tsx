import { Box, Button } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LockIcon from '@mui/icons-material/Lock';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import '../css/accountDetails.css'
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setUser } from '../redux/slice/appSlice';

export default function AppBar() {
        const dispatch = useDispatch()
    const navigate = useNavigate()
     const logout = () => {
                toast.success("Çıkış Yapıldı")
                localStorage.removeItem("user")
                dispatch(setUser(null))
                navigate("/")
            }
  return (
    <div className='w-full bg-[#646161] h-[90vh] text-[#fff] flex justify-between flex-col items-center '>
   <div className='!mt-5 '>
    <div className='flex justify-between items-center !mb-3 '>
       <Button  size='large' color='inherit' variant='text' sx={{textTransform:"none"}}>  <Link to={"/home/products"}> <ShoppingCartIcon />  <span className='!mx-5 text-[#fff] '>Ürünler</span></Link></Button>
    </div>
     <div className='flex justify-between items-center !mb-3'>
       <Button size='large' color='inherit' variant='text' sx={{textTransform:"none"}}>  <Link to={"/home/basket"}>  <ShoppingBasketIcon />  <span className='!mx-5 text-[#fff]'>Sepetim</span></Link></Button>
    </div>

     <div className='flex justify-between items-center !mb-3'>
       <Button size='large' color='inherit' variant='text' sx={{textTransform:"none"}}>  <Link to={"/home/past-orders"}>    <ContentPasteIcon />  <span className='!mx-5 text-[#fff]'>Geçmiş Siparişler</span></Link></Button>
    </div>
     <div className='flex justify-between items-center !mb-3'>
       <Button size='large' color='inherit' variant='text' sx={{textTransform:"none"}}>  <Link to={"/home/account-details"}>  <AccountBoxIcon />  <span className='!mx-5 text-[#fff]'>Hesap Bilgileri</span></Link></Button>
    </div>
     <div className='flex justify-between items-center !mb-3'>
       <Button size='large' color='inherit' variant='text' sx={{textTransform:"none"}}>  <Link to={"/home/privacy"}>    <LockIcon />  <span className='!mx-5 text-[#fff]'>Gizlilik</span></Link></Button>
    </div>
   </div>
 
  {/* <Box sx={{ p: 2,display:"none" }}>
    <Button onClick={logout} fullWidth variant="outlined" color='inherit'>
      Çıkış Yap
    </Button>
  </Box> */}
    </div>
  )
}
