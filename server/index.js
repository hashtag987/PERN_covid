const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");


//middleware
app.use(cors());
app.use(express.json()); //req.body

app.post("/addcentre", async (req, res) => {
  try {
    const { name, state, district,covaxine, covisheild,sputnik } = req.body;
    //console.log(req);
    const newCentre= await pool.query(
      "INSERT INTO centres (name, state, district,covaxine, covisheild,sputnik) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",
      [name, state, district,covaxine, covisheild,sputnik]
    );
    res.json(newCentre.rows[0]);
    
  } catch (err) {
    console.error(err.message);
  }
});


app.delete("/deletecentre",async (req, res)=>{
    try {
        const {name} = req.body;
        const deleteCentre = await pool.query(
            "DELETE FROM centres WHERE name = $1",[name]
        );
        res.json("Centre deleted");
    } catch (err) {
        console.error(err.message);
    }
});


app.get("/get/all",async (req, res)=>{
    try {
        const allCentres = await pool.query(
            "SELECT * FROM centres"
        );
        res.json(allCentres.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/get/location",async (req, res)=>{
    try {
        const {state,district}= req.body;
        //console.log(req.body);          
        const locCentres= await pool.query(
            "SELECT * FROM centres WHERE state= $1 AND district = $2",[state,district]
        );
        res.json(locCentres.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/get/name/:name",async (req, res)=>{
    try {
        const {name}= req.params;
        console.log(req.params);          
        const nameCentres= await pool.query(
            `SELECT * FROM centres WHERE name like '%${name}%'`
        );
        res.json(nameCentres.rows);
    } catch (err) {
        console.error(err.message);
    }
});


app.post("/bookslot", async (req, res) => {
    try {
      const { name, dob,slotdate,phone, vaccine} = req.body;
      const newSlot= await pool.query(
        "INSERT INTO bookings (name,dob,slotdate,phone,vaccine) VALUES($1,$2,$3,$4,$5) RETURNING *",
        [name, dob,slotdate,phone, vaccine]
      );
      res.json(newSlot.rows[0]);
      
    } catch (err) {
      console.error(err.message);
    }
});

app.get("/getbookings", async (req, res) => {
    try {
        const allbookings = await pool.query("SELECT * FROM bookings");
        res.json(allbookings.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(5000, () => {
    console.log("server has started on port 5000");
  });