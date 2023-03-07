import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { auth, firestore } from "../config/Firebase";
import { doc, getDoc } from "firebase/firestore";
// import '../styles/ModalPopup.scss';
import Navbar from "./Navbar";
import EditEntry from "./EditEntry";
import "../styles/BookInfo.scss"

//MUI components
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

function BookInfo() {
  const [userId, setUserId] = useState("");
  const [bookCard, setBookCard] = useState([]);
  const [bookRating, setBookRating] = useState("0");

  const { bookId } = useParams();

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((authObj) => {
      unsub();

      if (authObj) {
        const uid = auth.currentUser.uid;
        setUserId(uid);
        getDoc(doc(firestore, uid, "library"))
          .then((docSnap) => {
            if (docSnap.exists()) {
              //binary search of books
              function searchBooks(targetId, bookArr) {
                let start = 0;
                let end = bookArr.length - 1;

                while (start <= end) {
                  let middle = Math.floor((start + end) / 2);
                  if (bookArr[middle].bookID === targetId) {
                    setBookCard(bookArr[middle]);
                    setBookRating(bookArr[middle].rating);
                    return middle;
                  } else if (bookArr[middle].bookID < targetId) {
                    start = middle + 1;
                  } else {
                    end = middle - 1;
                  }
                }
                return -1;
              }

              searchBooks(Number(bookId), docSnap.data().library);
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

  return (
    <div>
      <Navbar />
      <main id="book-detail-container">
        <div className="book-wrapper">
          <div className="book-container" key={bookCard.bookID}>
            <div className="cover">
              <h3>{bookCard.title}</h3>
            </div>
            <div className="book-base">
              <div className="bookmark"></div>
            </div>
          </div>
        </div>

        <div id="info-container">
          <h1>{bookCard.title}</h1>
          <h2>{bookCard.author}</h2>
          <Box
            sx={{
              "& > legend": { mt: 2 },
            }}
          >
            <Typography component="legend">Rating</Typography>
            <Rating
              name="simple-controlled"
              value={bookRating}
              precision={0.5}
              readOnly
            />
          </Box>
          <Link to={`/library/${bookCard.bookID}/edit`}>Edit entry</Link>
        </div>
      </main>  
    </div>
    
  );
}

export default BookInfo;
