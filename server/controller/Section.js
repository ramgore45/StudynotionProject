const Course = require("../model/course")
const Section = require("../model/section")
const SubSection = require("../model/subSection")

exports.createSection = async(req,res)=>{
    try{
        // data fetch
        const {sectionName , courseId} = req.body
        // Data Validation
        if(!sectionName || !courseId){
            return res.status(404).json({
                success:false,
                message:"Missing Properties"
            })
        }

        // create secton
        const newSection = await Section.create({sectionName})
        //update course with sction  
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId ,
                {
                    $push: {
                        courseContent: newSection._id,
                    },
                },
                { new: true }
            ).populate({
                path: "courseContent",
               
              }).exec()

        console.log(updatedCourse)

        // Use populate to replace section and sub section with updated course details
        // return response
        return res.status(200).json({
            success:true,
            message:"Section created Successfully",
            updatedCourse
        })
    }
    catch(error){
        return res.status(404).json({
            success:false,
            message:"Section creation failed",
        })
    }
}

// updating sections 
exports.updateSection = async(req,res) => {
    try{
        // data input
        const {sectionName, sectionId, courseId}=req.body
        // data validation
        if(!sectionId||!sectionName){
            return res.status(404).json({
                success:false,
                message:"Data is missing",
            })
        }

        
        // update section
        const section = await Section.findByIdAndUpdate(sectionId , {sectionName},{new:true})

        const course = await Course.findById(courseId).populate({
                                                                 path: "courseContent",
                                                                 populate:{path:"subSection"},   
                                                                })
                                                                .exec()
        // return response
        return res.status(200).json({
            success:true,
            section:section,
            data:course,
            message:"Section updation Successfully", 
        })
    }
    catch(error){
        console.log(error)
        return res.status(400).json({
            success:false,
            message:"Updation section failed",
        })
    }
}

// deleting section
exports.deleteSection=async(req,res)=>{
    try{
        // getId
        const {sectionId, courseId} = req.body
        if(!sectionId){
            return res.status(404).json({
                success:false,
                message:"Data is missing"
           })
        }

        await Course.findByIdAndUpdate(courseId, {
            $pull:{
                courseContent:sectionId
            }
        })
        
        await SubSection.deleteMany({_id:{$in:Section.SubSection}})

        // TODO :- delete from Coursechema
        await Section.findByIdAndDelete(sectionId)

        const course = await Course.findById(courseId).populate({
            path:"courseContetn",
            populate:{
                path:"SubSection"
            }
        }).exec()


        return res.status(200).json({
            success:true,
            data:course,
            message:"Section Deleted ",
        })
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"Section deletion failed",
        })
    }
}