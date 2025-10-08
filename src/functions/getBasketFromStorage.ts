import type { SelectedProduct } from "../types/Types"

export const getBasketFromStorage = () : SelectedProduct[] => {
    let selectedProductsString = localStorage.getItem("selectedProducts")
    let selectedProducts : SelectedProduct[];
    if(selectedProductsString){
        selectedProducts  = JSON.parse(selectedProductsString) as SelectedProduct[]
    }
    else{
        selectedProducts = []
    }
    return selectedProducts;
}