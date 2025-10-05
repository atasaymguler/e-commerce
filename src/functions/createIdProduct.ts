import productService from "../services/ProductService";

export const createIdForProduct = async() : Promise<string> => {
    let index:number;
    let dataLength:number = (await productService.getAllProducts()).length
  
    if(dataLength > 0){
        index = dataLength +1
    }
    else{
        index = 1
    }
    return String(index)

}