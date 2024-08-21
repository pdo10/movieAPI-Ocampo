const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


mongoose.connect("mongodb+srv://Ocampo:Admin1234@cluster0.sabu57b.mongodb.net/S83-Activity?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'))

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const movieRoutes = require("./routes/movie");
const userRoutes = require("./routes/user");

app.use("/movies", movieRoutes);
app.use("/users", userRoutes);

if(require.main === module){
    app.listen(process.env.PORT || 4000, () => {
        console.log(`API is now online on port ${ process.env.PORT || 4000 }`)
    });
}

module.exports = { app, mongoose };