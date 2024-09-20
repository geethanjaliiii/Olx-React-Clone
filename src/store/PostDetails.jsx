import { createContext, useState } from "react";

export const PostDetails=createContext(null)

function Post({children}){
    const[productDetails,setProductDetails]=useState()
   return <PostDetails.Provider value={{productDetails,setProductDetails}}>
        {children}
    </PostDetails.Provider>
}
export default Post