const express = require("express")
const app = express()

app.use(express.json())

const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT || 3000

const database = require('./config/database')
database.connect()

const {cloudinaryConnect} = require('./config/cloudinary')
cloudinaryConnect()

const cookieParser = require('cookie-parser')
app.use(cookieParser())

const fileUpload = require('express-fileupload')
app.use(
    fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)

const cors = require('cors')
app.use(
    cors({
		origin:"*",
		credentials:true,
	})
)


const userRoutes = require("./routes/User")
const courseRoutes = require("./routes/Course")
const profileRoutes = require("./routes/Profile")
const paymentRoutes = require("./routes/Payment")

app.use('/api/v1/auth' , userRoutes)
app.use('/api/v1/profile' ,profileRoutes)
app.use('/api/v1/course' , courseRoutes)
app.use('/api/v1/payment', paymentRoutes)


app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})
