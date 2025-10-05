import { createAsyncThunk, createSlice, type ActionReducerMapBuilder } from '@reduxjs/toolkit'
import type { ProductType } from '../../types/Types'
import ProductService from '../../services/ProductService'
import type { AxiosResponse } from 'axios'

export interface ProductSliceType {
 products : ProductType[],
 productCount : number,
 page : number
}

const initialState: ProductSliceType = {
    products : [],
    productCount : 0,
    page : JSON.parse(localStorage.getItem("currentPage") || "1")
}
export const getProductByPage = createAsyncThunk(
  'getProductByPage',
  async ( { currentPage, itemsPerPage }: { currentPage: number; itemsPerPage: number }) => {
    const response : AxiosResponse<ProductType[], any, {}> = await ProductService.getAllProductsForPage(currentPage,itemsPerPage)
    return{
       products: response.data,
      totalCount: parseInt(response.headers['x-total-count'])
    }
  },
)

export const appSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
  
    },
    extraReducers :(builder :ActionReducerMapBuilder<ProductSliceType>) => {
        builder.addCase(getProductByPage.fulfilled, (state, action) => {
            state.products = action.payload.products
            state.productCount = action.payload.totalCount
        } )
    }
   
})

export const { } = appSlice.actions

export default appSlice.reducer