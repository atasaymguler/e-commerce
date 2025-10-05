import { Outlet, useLocation } from 'react-router-dom'
import AppBar from '../components/AppBar'
import { useEffect } from 'react';
import type { RegisterUserType } from '../types/Types';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slice/appSlice';
import { Container } from '@mui/material';

export default function HomePage() {
  const dispatch = useDispatch()
  useEffect(()=>{
        let userString =  localStorage.getItem("user")
        let user : RegisterUserType;
        if(userString){
          user = JSON.parse(userString) as  RegisterUserType
          dispatch(setUser(user))
        }  
   
    },[])

  return (
    <>
  <div className='flex'>
  
    <div className='w-1/6'><AppBar/></div>
    <div className='w-5/6 !py-4'> 
    <Container sx={{height:"100%"}} maxWidth="xl"> <div className='h-full' > 
       <Outlet />
        </div>  </Container>
   </div>
  </div>
 
    </>
  )
}
