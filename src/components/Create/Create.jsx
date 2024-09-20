import React, { Fragment, useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { FirebaseContext } from "../../store/FirebaseContext";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import {collection, addDoc} from 'firebase/firestore'
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // set img url after upload
  const { db, storage ,currentUser} = useContext(FirebaseContext);
const navigate = useNavigate()
  const handleImgUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) {
      alert("please select an image!");
      return;
    }
    // create a storage reference
    const storageRef = ref(storage, `images/${image.name}`); //the img is stored inside a folder named images in firebase
    //upload file to firebase strge
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log("file uploaded to firebase");
      },
      (error) => {
        console.error("upload failed", error.message);
      },
      // Get the image dowloaded URL
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImageUrl(url); //store the recieved url

          //add form data to firestore
          addDoc(collection(db, "products"), {
            name,
            category,
            price,
            imageUrl: url,
            id:currentUser?currentUser.uid:null,
            createdAt: new Date().toLocaleDateString()
          })
            .then(() => {
              navigate('/home')
              console.log("Data saved to Firestore");
              alert("Product created successfully");
            })
            .catch((error) => {
              console.error("error adding document", error.message);
            });
        });
      }
    );
  };
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form onSubmit={handleSubmit}>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input
              className="input"
              type="number"
              id="fname"
              name="Price"
              value={price}
              required
              onChange={(e) => setPrice(e.target.value)}
            />
            <br />
            <br />
            {image&& <img alt="uploaded image" width="200px" height="200px" src={image?URL.createObjectURL(image):""}></img>}

            <br />
            <input type="file" required onChange={handleImgUpload} />
            <br />
            <button type="submit" className="uploadBtn">upload and Submit</button>
          </form>
          
          
        </div>
        
      </card>
    </Fragment>
  );
};

export default Create;
