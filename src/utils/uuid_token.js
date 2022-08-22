import {v4 as uuidv4} from 'uuid' 
// 生成一个随机字符串，并每次读区都不变化
export const getUUID = () =>{
    let uuid_token = localStorage.getItem('UUIDDTOKEN');   //提取本地存储

    if(!uuid_token){ //如果没有已存的uuid
        uuid_token=uuidv4(); //生成
        console.log("new token")

        localStorage.setItem('UUIDTOKEN',uuid_token);//存进本地存储
        
    }
    return uuid_token  //返回 uuid    
}