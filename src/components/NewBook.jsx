import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, firestore } from "../config/Firebase";
import { updateDoc, doc, arrayUnion, getDoc } from "firebase/firestore";

//MUI components
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

//title
//rating
//read checkbox

function NewBook(props) {
  //handle hide/show modal
  if (!props.show) {
    return null;
  }

  const newTitle = useRef();
  const newRating = useRef();
  const newAuthor = useRef();

  const [userId, setUserId] = useState("");
  const [userLibrary, setUserLibrary] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [bookRating, setBookRating] = useState(0);
  const [bookStatus, setBookStatus] = useState("");

  //retrieve library
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((authObj) => {
      unsub();

      if (authObj) {
        const uid = auth.currentUser.uid;
        setUserId(uid);
        getDoc(doc(firestore, uid, "library"))
          .then((docSnap) => {
            if (docSnap.exists()) {
              setUserLibrary(docSnap.data());
            } else {
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.log("Error getting document: ", error);
          });
      } else {
        console.log("User not logged in");
      }
    });
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();

    let newStatus = false;

    if (document.getElementById("is-read").checked) {
      console.log("read");
      newStatus = true;
    } else {
      console.log("not read");
      newStatus = false;
    }

    //console.log(typeof(userLibrary.library.length));

    const newBookEntry = {
      bookID: userLibrary.library.length + 1,
      title: newTitle.current.value,
      author: newAuthor.current.value,
      rating: bookRating,
      isRead: newStatus,
    };

    try {
      const ref = doc(firestore, userId, "library");
      updateDoc(ref, {
        library: arrayUnion(newBookEntry),
      });

      //wait for document to update before reloading
      //set up a loading animation
      setTimeout(() => {
        window.location.reload();
      }, 2000);

      //console.log(userLibrary.library)

      setTimeout();
    } catch (error) {
      //replace with a "please try again error message"
      console.log(error);
    }

    //console.log(newBookEntry)
  };

  //hide and show modal

  return (
    <div className="modal">
      <div className="modal__content">
        <h3>Add a new book</h3>
        <form>
          <div className="input-group">
            <label for="title-input">Title</label>
            <input
              type="text"
              placeholder="Title"
              ref={newTitle}
              id="title-input"
            ></input>
          </div>

          <div className="input-group">
            <label for="author-input">Author</label>
            <input type="text" placeholder="Author" ref={newAuthor} id="author-input"></input>
          </div>

          <div className="stats-input">
            <Box
              sx={{
                "& > legend": { mt: 2 },
              }}
            >
              <label for="book-rating" className="input-label">Rating</label>
              <Rating
                name="simple-controlled"
                value={bookRating}
                onChange={(event, newBookRating) => {
                  setBookRating(newBookRating);
                }}
                precision={1}
                id="book-rating"
              />
            </Box>
            <div className="checkbox-input">
            <label for="is-read" className="input-label">Completed?</label>
              <input type="checkbox" name="is-read" id="is-read"></input>
              
            </div>
          </div>

          <button className="close-btn redBtn" onClick={props.onClose} type="button">
            Close
          </button>
          <button className="save-btn greenBtn" type="submit" onClick={handleSave}>
            Save and close
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewBook;
