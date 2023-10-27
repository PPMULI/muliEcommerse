import React, { useState } from "react";
import RaisedTicket from "../About/RaisedTicket";
import MyraisedTicket from "./MyraisedTicket";

function RaisedTicketComponent() {
  const [bookid, setBookid] = useState("");
  const getBookIdHandler = (id) => {
    console.log(id);
    setBookid(id);
  };
  return (
    <div>
      <RaisedTicket />
      <MyraisedTicket getBookId={getBookIdHandler} />
    </div>
  );
}

export default RaisedTicketComponent;
