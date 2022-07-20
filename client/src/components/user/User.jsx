import React, { useState, useEffect } from "react";
import { Container, Button } from "@mui/material";
import { styles } from "./user.css";
import Book from "./Book";
const User = () => {
  const [centre, setcentre] = useState([]);
  const [data, setData] = useState({
    name: "",
    state: "",
    district: "",
  });

  const [locinput, setlocinput] = useState(true);
  const [nameinput, setnameinput] = useState(false);
  const [bookslot, setbookslot] = useState(false);
  const getCentres = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    try {
      const response = await fetch("http://localhost:5000/get/all");
      const jsonData = await response.json();
      setcentre(jsonData);
      //console.log(jsonData);
    } catch (err) {
      console.error(err);
    }
  };

  const getCentresbylocation = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    try {
      const response = await fetch("http://localhost:5000/get/location", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const jsonData = await response.json();
      setcentre(jsonData);
      //console.log(jsonData);
    } catch (err) {
      console.error(err);
    }
  };

  const getCentresbyName = async (e) => {
    console.log(data.name);
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    try {
      if (data.name.length > 0) {
        const response = await fetch(
          `http://localhost:5000/get/name/${data.name}`
        );
        const jsonData = await response.json();
        setcentre(jsonData);
        //console.log(jsonData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // const toggleSearch = (event) => {
  //   event.preventDefault();
  //   setlocinput(!locinput);
  //   setnameinput(!nameinput);
  // };

  const toggleLocation = (event) => {
    event.preventDefault();
    if (!locinput) {
      setnameinput(!nameinput);
      setlocinput(!locinput);
    }
  };

  const toggleName = (event) => {
    event.preventDefault();
    if (!nameinput) {
      setnameinput(!nameinput);
      setlocinput(!locinput);
    }
  };

  const togglebook = (event) => {
    event.preventDefault();
    setbookslot(!bookslot);
  };

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
    console.log(data);
  };

  useEffect(() => {
    //getCentres();
    getCentresbylocation();
    getCentresbyName();
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <ul className="nav">
          <li className="nav-item">
            <button
              className="button button-user"
              onClick={(e) => togglebook(e)}
            >
              Book slot
            </button>
          </li>
          <li className="nav-item">
            <button className="button button-user">Log out</button>
          </li>
        </ul>
      </div>
      {/* {bookslot && <Book toggle={(e)=>togglebook(e)}/>} */}
      <div className="center">
        {bookslot && <Book toggle={(e) => togglebook(e)} />}
        <h4 className="text">Let's get you a centre</h4>
        <div className="search-options">
          <ul className="search">
            <li className="item">
              <button
                className="button button-search"
                onClick={(event) => toggleName(event)}
              >
                By Name
              </button>
            </li>
            <li className="item">
              <button
                className="button button-search"
                onClick={(event) => toggleLocation(event)}
              >
                By location
              </button>
            </li>
            <li className="item">
              <button
                className="button button-search"
                onClick={(event) => getCentres(event)}
              >
                Get all
              </button>
            </li>
          </ul>
        </div>
      </div>
      {locinput && (
        <div>
          <form
            className="form-location"
            onSubmit={(e) => getCentresbylocation(e)}
          >
            <div className="input-fields">
              <input
                type="text"
                placeholder="Enter State"
                name="state"
                value={data.state}
                onChange={handleChange}
                className="input"
              />
              <input
                type="text"
                placeholder="Enter District"
                name="district"
                value={data.district}
                onChange={handleChange}
                className="input"
              />
            </div>
            <button className="button button-submit-location" type="submit">
              Search
            </button>
          </form>
        </div>
      )}
      {nameinput && (
        <div>
          <form className="form-name" onSubmit={(e) => getCentresbyName(e)}>
            <div className="input-name">
              <input
                type="text"
                placeholder="Enter Name"
                name="name"
                value={data.name}
                onChange={handleChange}
                className="input"
              />
            </div>
            <button className="button button-submit-name" type="submit">
              Search
            </button>
          </form>
        </div>
      )}
      <table className="search-table">
        <thead>
          <tr>
            <th>Centre</th>
            <th>Covaxine</th>
            <th>Covishield</th>
            <th>Sputnik</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {centre.map((c) => (
            <tr key={c.id}>
              <td>
                {c.name},<br />
                {c.state},<br />
                {c.district}
              </td>
              <td>{c.covaxine === 1 ? "Available" : "N/A"}</td>
              <td>{c.covisheild === 1 ? "Available" : "N/A"}</td>
              <td>{c.sputnik === 1 ? "Available" : "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default User;
