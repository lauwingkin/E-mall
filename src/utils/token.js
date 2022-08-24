export const setToken = (token) =>{
    console.log("token已保存在本地")
    localStorage.setItem('TOKEN',token);   //本地存储

    //return uuid_token  //返回 uuid    
}


export const removeToken = () =>{
    localStorage.removeItem('TOKEN');   //清除本地存储中的token
  
}