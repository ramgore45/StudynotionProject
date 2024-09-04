const Cloudinary = require("cloudinary").v2

exports.uploadImageToCludinary = async (file,folder,height,quality)=>{
        console.log("IMage uploader ",file)
        const options = {folder}
        if(quality){
            options.quality = quality
        }
        if(height){
            options.height = height
        }
        
        options.resource_type= 'auto'
        console.log('Options',options)
        return await Cloudinary.uploader.upload(file.tempFilePath , options)
}