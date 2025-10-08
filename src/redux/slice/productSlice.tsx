import {
  createAsyncThunk,
  createSlice,
  type ActionReducerMapBuilder,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { ProductType, SelectedProduct } from "../../types/Types";
import ProductService from "../../services/ProductService";
import type { AxiosResponse } from "axios";
import { getBasketFromStorage } from "../../functions/getBasketFromStorage";

export interface ProductSliceType {
  products: ProductType[];
  productCount: number;
  page: number;
  basketDrawer: boolean;
  selectedProducts: SelectedProduct[] ;
  calculetBasket : number
}

const initialState: ProductSliceType = {
  products: [],
  productCount: 0,
  page: JSON.parse(localStorage.getItem("currentPage") || "1"),
  basketDrawer: false,
  selectedProducts: getBasketFromStorage(),
  calculetBasket  : 0
};
export const getProductByPage = createAsyncThunk(
  "getProductByPage",
  async ({
    currentPage,
    itemsPerPage,
  }: {
    currentPage: number;
    itemsPerPage: number;
  }) => {
    const response: AxiosResponse<ProductType[], any, {}> =
      await ProductService.getAllProductsForPage(currentPage, itemsPerPage);
    return {
      products: response.data,
      totalCount: parseInt(response.headers["x-total-count"]),
    };
  }
);

export const appSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setBasketDrawer: (
      state: ProductSliceType,
      action: PayloadAction<boolean>
    ) => {
      state.basketDrawer = action.payload;
    },
    setSelectedProducts: (
      state: ProductSliceType,
      action: PayloadAction<SelectedProduct>
    ) => {
      if (state.selectedProducts.length === 0) {
        // Hiç ürün yoksa
        state.selectedProducts = [action.payload];
        
        localStorage.setItem(
          "selectedProducts",
          JSON.stringify(state.selectedProducts)
        );
      } else {
        // Daha önce ürün var
        let findProduct = state.selectedProducts.find(
          (product) => product.id === action.payload.id
        );
        if (findProduct) {
          // Aynı üründen var
          findProduct.count += action.payload.count;
          state.selectedProducts = [
            ...state.selectedProducts.filter((product: SelectedProduct) =>
              product.id !== findProduct.id ? product : findProduct
            ),
          ];
          localStorage.setItem(
            "selectedProducts",
            JSON.stringify(state.selectedProducts)
          );
        } else {
          // Aynı üründen yok
          state.selectedProducts = [...state.selectedProducts, action.payload];
          localStorage.setItem(
            "selectedProducts",
            JSON.stringify(state.selectedProducts)
          );
        }
        
      }
    },
    plusSelectedProduct: (
      state: ProductSliceType,
      action: PayloadAction<string>
    ) => {
      state.selectedProducts.find((product) => {
        if (product.id === action.payload) {
          product.count += 1;
           
        }
      });
     
      localStorage.setItem(
            "selectedProducts",
            JSON.stringify(state.selectedProducts)
          );
    },
    minusSelectedProduct: (
      state: ProductSliceType,
      action: PayloadAction<string>
    ) => {

      let newArray = state.selectedProducts.filter((product)=> product.id !== action.payload)
      state.selectedProducts && state.selectedProducts.map((product:SelectedProduct)=>{
        if(product.id == action.payload){
           if(product.count > 1){
            // 1'den fazla ürün var
            product.count -=1
            localStorage.setItem(
            "selectedProducts",
            JSON.stringify(state.selectedProducts)
          );
           }
           else{
            // 0 ürün var listeden çıkart
            state.selectedProducts = [...newArray]
            localStorage.setItem(
            "selectedProducts",
            JSON.stringify(state.selectedProducts)
          );

           }
        }
      })
        
    },
    setCalculetBasket : (state:ProductSliceType ) => {
      state.calculetBasket = 0;
      state.selectedProducts.map((product:SelectedProduct)=>{
        state.calculetBasket += product.count * product.price
      })
    },
    resetsTheBasket : (state:ProductSliceType) => {
      state.selectedProducts = []
    }

  },
  extraReducers: (builder: ActionReducerMapBuilder<ProductSliceType>) => {
    builder.addCase(getProductByPage.fulfilled, (state, action) => {
      state.products = action.payload.products;
      state.productCount = action.payload.totalCount;
    });
  },
});

export const {
  setBasketDrawer,
  setSelectedProducts,
  plusSelectedProduct,
  minusSelectedProduct,
  setCalculetBasket,
  resetsTheBasket
} = appSlice.actions;

export default appSlice.reducer;
