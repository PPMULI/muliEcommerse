import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { deletebook, getBooks } from "../Dummy";
import projectcontext from "../../projectcontext/projectContext";

function Bookliost({ getbookId }) {
  const [book, setBook] = useState([]);

  const [list, setList] = useState([]);
  const context = useContext(projectcontext);
  const { product, setProduct, getProducts } = context;
  useEffect(() => {
    getProducts();
  }, []);
  console.log(product);

  const getAllBooks = async () => {
    const data = await getBooks();
    console.log(data.docs);
    setBook(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deletehandler = async (id) => {
    await deletebook(id);
    getAllBooks();
  };

  const product_details = async (email) => {
    // alert("product")
    const items = await book.filter((products) => {
      console.log(products.email);
      return products.email == "shivam@gmail.com";
    });

    console.log(items);
    setList(items);
    return items;
  };

  console.log(list);
  return (
    <>
      <pre>{JSON.stringify(book, undefined, 2)}</pre>
      <div>Bookliost</div>
      {book.map((doc, index) => {
        return (
          <tr key={doc.id}>
            <td>{doc.email}</td>
            <td>{doc.name}</td>
            <td>
              <button
                className="btn btn-primary mx-3"
                onClick={(e) => {
                  getbookId(doc.id);
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-primary mx-3"
                onClick={(e) => {
                  deletehandler(doc.id);
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      })}

      <button
        onClick={(e) => {
          product_details("shivam@gmail.com");
        }}
      >
        button
      </button>
    </>
  );
}

export default Bookliost;
