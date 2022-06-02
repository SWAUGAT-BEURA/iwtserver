const logger = require("./middleware/logger");
const express = require("express");
const cors = require("cors");

const corsOption = {
  origin: "*",
};

const app = express();
const userRoutes = require("./routes/user");
const facultyRoutes = require("./routes/facultyroutes");
const blogRoutes = require("./routes/blogsroutes");
const dbConn = require("./config/db.conn");

const port = process.env.PORT || 3000;

app.use(cors(corsOption));
app.use(express.json());
app.use(logger);

app.use(userRoutes);
app.use(facultyRoutes);
app.use(blogRoutes);
dbConn();

app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
