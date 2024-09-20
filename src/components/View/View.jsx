import React, { useContext, useState, useEffect } from "react";
import { FirebaseContext } from "../../store/FirebaseContext";
import { PostDetails } from "../../store/PostDetails";
import { collection, getDocs, query, where } from "firebase/firestore";
import "./View.css";

function View() {
  const { productDetails } = useContext(PostDetails);
  const { db } = useContext(FirebaseContext);
  const [userDetails, setUserDetails] = useState();
  useEffect(() => {
   

    const fetchUserDetails = async () => {
      try {
        const { id } = productDetails; //extracting userId from product details
        const q = query(collection(db, "users"), where("uid", "==", id));
        const querySnapshot = await getDocs(q);
           console.log(querySnapshot);
           
        querySnapshot.forEach((doc) => setUserDetails(doc.data()));
        
      } catch (error) {
        console.log("error fetching data", error.message);
      }
    };
    fetchUserDetails();
  }, [db, productDetails]);
  console.log("seller details fetched",userDetails);
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={`${productDetails?.imageUrl}`} alt="" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {productDetails?.price}</p>
          <span>{productDetails?.name}</span>
          <p>{productDetails?.category}</p>
          <span>{productDetails?.createdAt}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails?.username}</p>
          <p>{userDetails?.phone}</p>
        </div>
      </div>
    </div>
  );
}
export default View;
