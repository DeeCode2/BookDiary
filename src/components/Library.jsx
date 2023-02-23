import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth, firestore } from "../config/Firebase";
import { doc, getDoc } from "firebase/firestore";
import Navbar from "./Navbar";
import NewBook from "./NewBook";
import "../styles/bookGallery.scss";
import "../styles/bookIcon.scss";
import "../styles/ModalPopup.scss";

//MUI components
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from '@mui/icons-material/Search';

function Library() {
  const [userLibrary, setUserLibrary] = useState([]);
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState("");
  //const [bookRating, setBookRating] = useState(0);

  //retrieve array of all books in the library document
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((authObj) => {
      unsub();

      if (authObj) {
        const uid = auth.currentUser.uid;

        getDoc(doc(firestore, uid, "library"))
          .then((docSnap) => {
            if (docSnap.exists()) {
              setUserLibrary(docSnap.data().library);
            } else {
              //change this line to instead render an icon/image
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.log("Error getting document: ", error);
          });
      } else {
        console.log("User is not logged in");
      }
    });
  }, []);

  //reverse array to get most recent one first
  let reversedBooks = userLibrary;
  let books = [...reversedBooks].reverse();

  let bookCards = books
    .filter((book) => {
      if (query === "") {
        return book;
      } else if (book.title.toLowerCase().includes(query.toLowerCase())) {
        return book;
      }
    })
    .map((book) => {
      return (
        <div className="book-wrapper">
          <div className="book-container" key={book.bookID}>
            <div className="cover">
              <h3>{book.title}</h3>
            </div>
            <div className="book-base">
              <div className="bookmark"></div>
            </div>
          </div>
          <div className="book__info">
            <h4>Author</h4>
            <Box
              className="rating-container"
              sx={{
                "& > legend": { mt: 2 },
              }}
            >
              <Rating
                name="simple-controlled"
                value={book.rating}
                precision={0.5}
                readOnly
              />
            </Box>

            <div className="book__status">
              {book.isRead ? <CheckCircleIcon /> : <span>Not started</span>}
            </div>
            <Link to={`/library/${book.bookID}`}>Detail</Link>
          </div>
        </div>
      );
    });

  return (
    <main>
      <Navbar />
      <div id="search-input">
        <input
          className="search-input"
          type="text"
          placeholder="Search for your recipes here"
          onChange={(e) => setQuery(e.target.value)}
        />
        <SearchIcon/>
      </div>
      
      <section id="books">
        <div className="book-slot">
          {/* <Link to={"/newbook"}>Add a new book</Link> */}
          <button id="new-book-btn" onClick={() => setShow(true)}>
            Add a book
            <AddIcon className="add-icon" sx={{ fontSize: "5rem" }} />
          </button>
        </div>
        {bookCards}
      </section>
      <NewBook onClose={() => setShow(false)} show={show} />
    </main>
  );
}

export default Library;
