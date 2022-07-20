import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { styles } from "./admin.css";
const AllBookings = () => {
  const [booking, setbooking] = useState([]);
  const getbookings = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    try {
      const response = await fetch("http://localhost:5000/getbookings");
      const jsonData = await response.json();
      setbooking(jsonData);
      //console.log(jsonData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getbookings();
  });
  return (
    <div className="main-container">
        <button>Go back</button>
        <form className="filter-by-slot">
            <input
                type = "text"
                placeholder="Start DOB"
                onFocus={(e)=> (e.target.type = "date")}
                onBlur={(e)=> (e.target.type = "text")}
                
            />
        </form>
      <div className="book-container">
        <table className="book-table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Name</th>
              <th>Date Of Birth</th>
              <th>Slot date</th>
              <th>Phone Number</th>
              <th>Vaccine</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {booking.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.dob.substring(0, 10)}</td>
                <td>{c.slotdate.substring(0, 10)}</td>
                <td>{c.phone}</td>
                <td>{c.vaccine}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBookings;
