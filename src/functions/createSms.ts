
export const createSms = () : string => {
    const numbers = ["0","1","2","3","4","5","6","7","8","9"]
    let sms = ""
    for(let i=0;i<6;i++){
        let number = Math.floor(Math.random()*10)
        sms +=numbers[number]
    }
    return sms
}