import pastOrders from "../services/PastOrders";

export const createIdForPastOrders = async() : Promise<string> => {
    let index:number;
    let dataLength:number = (await pastOrders.getAllOrders()).length
  
    if(dataLength > 0){
        index = dataLength +1
    }
    else{
        index = 1
    }
    return String(index)

}