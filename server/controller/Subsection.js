const SubSection = require("../model/subSection")
const Section = require("../model/section")
const { uploadImageToCludinary } = require("../utils/imageUploader")
require("dotenv").config()

// create Sections 
exports.createSubsection = async(req,res) =>{
    try{
        // fetch data
        const {sectionId , title, description} = req.body

        // extract video from file
        const video = req.files.video
        // validation
        if(!sectionId || !title || !video || !description){
            return res.status(401).json({
                success:false,
                message:"please fill all the details of subsection",
            })
        }
        
        console.log('BEfore uploaded video url',video)
        // upload to cloudinary and fetch secure.Url
        const uploadVid = await uploadImageToCludinary(video , process.env.FOLDER_NAME)
        console.log('uploaded video url',uploadVid)
        // create sub section
        const SubSectionDetails = await SubSection.create({
            title:title,
            description:description,
            videoUrl:uploadVid.secure_url
        })

        console.log('subsection Details',SubSectionDetails) 
        // subsection push to section
        const updatedSection = await Section.findByIdAndUpdate(
            {_id:sectionId},
            {
                $push:{subSection:SubSectionDetails._id}
            },
            {new:true})
            .populate("subSection").exec()
            // populate HomeWork
        
        // return response
            return res.status(200).json({
                success:true,
                data:updatedSection,
                message:"Sub section successfully"
            })
    }
    catch(error){
        console.log(error)
        return res.status(400).json({
            success:false,
            message:"Subsection creation failed",
        })
    }
}

// HomeWork Update SUbSection

exports.updateSubSection= async(req,res)=>{
    try{
        const {subSectionId , title,timeDuration, description, sectionId} = req.body
        const video = req.files.videoFile

        if(!subSectionId || !title || !timeDuration || !description || !video){
            return res.status(400).json({
                success:false,
                message:"please fill all Details"
            })
        }

        const uploadVideo = await uploadImageToCludinary(video , process.env.FOLDER_NAME)

        await SubSection.findByIdAndUpdate(
            subSectionId,
            {
                title:title,
                timeDuration:timeDuration,
                description:description,
                videoUrl:uploadVideo.secure_url
            },
            {new:true}
        )

        const updatedSection = await Section.findById(sectionId).populate("subSection")

        return res.status(200).json({
            success:true,
            data: updatedSection,
            message:"subSection updated successfully"
        })

    }
    catch(error){
        console.log(error)
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}


exports.deleteSubSection=async(req,res)=>{
    try{
        const {sectionId , subSectionId} = req.body
        if(!subSectionId || !sectionId){
            return res.status(400).json({
                success:false,
                message:"data not found"
            })
        }

        await Section.findByIdAndUpdate(
            {_id:sectionId},
            {
                $pull:{
                    subSection:subSectionId
                }
            }
        )

        await SubSection.findByIdAndDelete(subSectionId)
        const updatedSection = await Section.findById(sectionId).populate("subSection")

        return res.status(200).json({
            success:true,
            data:updatedSection,
            messsage:"SubSection deleted successfully"
        })
    }
    catch(error){
        console.log(error)
        return res.status(404).json({
            success:false,
            message:error.message
        })
    }
}
