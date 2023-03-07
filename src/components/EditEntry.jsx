import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { auth, firestore } from "../config/Firebase";
import { updateDoc, doc, arrayUnion, getDoc } from "firebase/firestore";
import "../styles/ModalPopup.scss";

//MUI components
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

function EditEntry() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  let editedTitle = useRef();
  let editedAuthor = useRef();
  const [userId, setUserId] = useState("");
  const [userLibrary, setUserLibrary] = useState("");
  const [currentBook, setCurrentBook] = useState("");
  const [deletedBookLibrary, setDeletedBookLibrary] = useState([]);
  //const [changedRating, setChangedRating] = useState();
  let editedRating;
  let changedRating;

  //retrieve book
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
              setCurrentBook(docSnap.data().library.filter((item) => item.bookID == Number(bookId))[0]);
              setDeletedBookLibrary(
                docSnap
                  .data()
                  .library.filter((item) => item.bookID !== Number(bookId))
              );
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

  

  


  function deleteBookEntry() {

    //loop over deleted library to make sure that the ids are consistent
    for (let i = 0; i < deletedBookLibrary.length; i++) {
      deletedBookLibrary[i].bookID = i+1;
    }

    try {
      updateDoc(doc(firestore, userId, "library"), {
        library: deletedBookLibrary,
      });

      setTimeout(() => {
        window.location = "/library";
      }, 2000);

      setTimeout();
    } catch (err) {
      console.log(err.message);
    }
  }

  const handleSave = async (e) => {
    e.preventDefault();

    let editedStatus = false;

    if (document.getElementById("is-read").checked) {
      editedStatus = true;
    } else {
      editedStatus = false;
    }

    let newRating;

    if (editedRating == undefined) {
      newRating = currentBook.rating;
    } else {
      newRating = changedRating;
    }

    const editedEntry = {
      bookID: Number(bookId),
      title: editedTitle.current.value,
      author: editedAuthor.current.value,
      rating: newRating,
      isRead: editedStatus,
    };

    try {
      const unsub = auth.onAuthStateChanged((authObj) => {
        unsub();
        if (authObj) {
          const uid = auth.currentUser.uid;

          getDoc(doc(firestore, uid, "library"))
            .then((docSnap) => {
              if (docSnap.exists()) {
                //const colRef = userId;
                const ref = doc(firestore, userId, "library");

                //get index of unedited recipe
                const bookIndex = editedEntry.bookID - 1;

                //copy array
                const newArr = docSnap.data().library;

                if (bookIndex !== -1) {
                  newArr[bookIndex] = editedEntry;
                }

                updateDoc(ref, {
                  library: newArr,
                });

                setTimeout(() => {
                  window.location.replace(
                    `/library/${editedEntry.bookID}`
                  );
                }, 2000);

                setTimeout();

                console.log(editedEntry)
              } else {
                console.log("No such document!");
              }
            })
            .catch((error) => {
              console.log("Error getting document:", error);
            });
        } else {
          console.log("user not logged in");
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="modal">
      <div className="modal__content">
        <h3>Edit book entry</h3>
        <form>
          <div className="input-group">
            <label for="title-input">Title</label>
            <input
              type="text"
              placeholder="title"
              defaultValue={currentBook.title}
              ref={editedTitle}
            ></input>
          </div>

          <div className="input-group">
            <label for="author-input">Author</label>
            <input
              type="text"
              placeholder="Author"
              ref={editedAuthor}
              id="author-input"
              defaultValue={currentBook.author}
            ></input>
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
                value={currentBook.rating}
                onChange={(event, newBookRating) => {
                  editedRating = newBookRating;

                  changedRating = editedRating;
                }}
                precision={0.5}
                //ref={editedRating}
              />
            </Box>
            <div className="checkbox-input">
              <div className="checkbok-container">
                <label for="is-read" className="input-label">Completed?</label>
                {currentBook.isRead ? (
                  <input
                    type="checkbox"
                    name="is-read"
                    id="is-read"
                    defaultChecked
                  ></input>
                ) : (
                  <input
                    type="checkbox"
                    name="is-read"
                    id="is-read"
                    ref={editedRating}
                  ></input>
                )}
              </div>
            </div>
          </div>

          <button type="submit" onClick={handleSave} className="save-btn">
            Save and close
          </button>
          <button
            type="button"
            onClick={deleteBookEntry}
            className="delete-btn"
          >
            Delete
          </button>

          <button className="close-btn" type="button">
            Close
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditEntry;
