import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../redux/store'

export default function Spinner() {

  const {drawer} = useSelector((state:RootState)=> state.app)

  return (
    <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
       open={drawer}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
  )
}
