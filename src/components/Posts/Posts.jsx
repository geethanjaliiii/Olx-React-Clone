import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Heart from "../../assets/Heart";
import "./Posts.css";
import { FirebaseContext } from "../../store/FirebaseContext";
import { collection, getDocs } from "firebase/firestore";
import ViewPost from "../../Pages/ViewPost";
import { PostDetails } from "../../store/PostDetails";

function Posts() {
  const [products, setProducts] = useState();
  const { db, storage ,currentUser} = useContext(FirebaseContext);
  const { productDetails, setProductDetails } = useContext(PostDetails);
const navigate= useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        //recieve an array of all products spreading each product and giving id
        const productsArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsArray);
        console.log("products fetched", productsArray);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [db]);

  return (
    <div className="postParentDiv">
      {currentUser && <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span className="view-more">View more</span>
        </div>
        <div className="cards">
          {products &&
            products.map((product) => {
              return (
                <div
                  className="card"
                  onClick={() => {
                    setProductDetails(product);
                    console.log("product details", productDetails);
                    navigate('/view')
                  }}
                >
                  {/* //when we click on the post it sets the productDetail as current product */}
                  <div className="favorite">
                    <Heart></Heart>
                  </div>
                  <div className="image">
                    <img src={product.imageUrl} alt="product.name" />
                  </div>
                  <div className="content">
                    <p className="rate">&#x20B9; {product.price}</p>
                    <span className="kilometer">{product.category}</span>
                    <p className="name"> {product.name}</p>
                  </div>
                  <div className="date">
                    <span>{product.createdAt}</span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>}
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">{products && products.map((product)=>{
          return(<div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.imageUrl} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name"> {product.name}</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>)
        })}
          
        </div>
      </div>
    </div>
  );
}

export default Posts;
