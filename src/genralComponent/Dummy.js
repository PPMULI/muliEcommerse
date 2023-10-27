// import React from "react";
// import { db } from "../Authentaction/Config2";
// import {
//   collection,
//   getDocs,
//   getDoc,
//   addDoc,
//   updateDoc,
//   deleteDoc,
//   doc,
// } from "firebase/firestore";

// const bookCollectionRef = collection(db, "eCArt");
// class BookDataService {
//   addBooks = (newBooks) => {
//     return addDoc(bookCollectionRef, newBooks);
//   };

//   updateBook = (id, updatedbook) => {
//     const bookDoc = doc(db, "eCArt", id);
//     return updateDoc(bookDoc, updatedbook);
//   };

//   deleteBook = (id) => {
//     const bookDoc = doc(db, "eCArt", id);
//     return deleteDoc(bookDoc);
//   };

//   getAllBooks = () => {
//     return getDocs(bookCollectionRef);
//   };

//   getBook = (id) => {
//     const bookDoc = doc(db, "eCArt", id);
//     return getDoc(bookDoc);
//   };
// }
// function Dummy() {
//   return (
//     <>
//      <h1>dummy</h1>
//     </>
//   );
// }

// export default Dummy;

import React from "react";
import { db } from "../Authentaction/Config";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

// Initialize the Firestore collection reference
const bookCollectionRef = collection(db, "eCArt");

const addData = (newBooks) => {
  return addDoc(bookCollectionRef, newBooks);
};

const getBooks = () => {
  return getDocs(bookCollectionRef);
};

const deletebook = (id) => {
  const bookDoc = doc(db, "eCArt", id);
  return deleteDoc(bookDoc);
};

const updateBook = (id, updatedbook) => {
  const bookDoc = doc(db, "eCArt", id);
    return updateDoc(bookDoc, updatedbook);
}

const getBook = (id) => {
      const bookDoc = doc(db, "eCArt", id);
    return getDoc(bookDoc);
}
class BookDataService {
  //  addBooks = (newBooks) => {
  //   return addDoc(bookCollectionRef, newBooks);
  // };

  // updateBook = (id, updatedbook) => {
  //   const bookDoc = doc(db, "eCArt", id);
  //   return updateDoc(bookDoc, updatedbook);
  // };

  // deleteBook = (id) => {
  //   const bookDoc = doc(db, "eCArt", id);
  //   return deleteDoc(bookDoc);
  // };

  // getAllBooks = () => {
  //   return getDocs(bookCollectionRef);
  // };

  // getBook = (id) => {
  //   const bookDoc = doc(db, "eCArt", id);
  //   return getDoc(bookDoc);
  // };
}

function Dummy() {
  return (
    <>
      <h1>dummy</h1>
    </>
  );
}

export { getBooks,deletebook, getBook, updateBook };
export default addData;
