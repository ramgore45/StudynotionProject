const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    name :{
        type:String,
    },
    description :{
        type:String,
        require:true
    },
    courses: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Course",
		},
	],
})

module.exports = mongoose.model("Category", categorySchema)