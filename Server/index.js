require("dotenv").config();
const express=require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app=express();
require("./db/db");
const authEmpRoute = require("./routes/authEmp.route");
const companyRoute= require("./routes/company.route");
const branchRoute =require("./routes/branch.route");
const designationRoute = require("./routes/common/designation.route");
const qualifiactionRoute = require("./routes/common/qualification.route");
const degreeRoute = require("./routes/common/degree.route");

const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended:true }));
app.use("/auth", authEmpRoute);
app.use("/company",companyRoute);
app.use("/common",designationRoute);
app.use("/common",qualifiactionRoute);
app.use("/common",degreeRoute);
app.use("/branch",branchRoute);


app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
})