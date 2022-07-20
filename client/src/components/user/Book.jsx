import React, { useState} from "react";
import { style } from "./user.css";
import { Icon } from "@iconify/react";
const Book = ({ toggle }) => {
  //const [date, setDate] = useState(new Date());
  const [data, setData] = useState({
    name: "",
    dob: "",
    slotdate: "",
    phone: "",
    vaccine: "",
  });

  const bookslot = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    try {
      const response = await fetch("http://localhost:5000/bookslot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const jsonData = await response.json();
      //setcentre(jsonData);
      console.log(jsonData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
    console.log(data);
  };
  return (
    <div className="container">
      <div className="box">
        <span className="close-icon" onClick={(e) => toggle(e)}>
          <Icon icon="clarity:close-line" width="20" height="25" />
        </span>
        <div>
          <div className="book-text">
            <u>Book a slot</u>
          </div>
          <form className="book-form" onSubmit={(e) => bookslot(e)}>
            <input
              type="text"
              placeholder="Enter Name"
              name="name"
              value={data.name}
              onChange={handleChange}
              className="input-form"
            />
            <input
              placeholder="Enter DOB"
              type="text"
              name="dob"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              value={data.dob}
              onChange={handleChange}
              dateformat="yyyy-mm-dd"
              className="input-form"
            />
            <input
              placeholder="Select slot date"
              type="text"
              name="slotdate"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              value={data.slotdate}
              onChange={handleChange}
              dateformat="yyyy-mm-dd"
              className="input-form"
            />
            <input
              type="text"
              placeholder="Enter Phone Number"
              name="phone"
              value={data.phone}
              onChange={handleChange}
              className="input-form"
            />
            <select name="vaccine" className="input-form" onChange={handleChange}>
              <option value="Covaxine">Covaxine</option>
              <option value="Covishield">Covishield</option>
              <option value="Sputnik">Sputnik</option>
            </select>
            <button className="button book-button">Book</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Book;
