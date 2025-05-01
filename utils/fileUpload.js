const cloudinary = require('cloudinary').v2;


const fileUpload = async (file, folder) => {

	const options = {
		folder,
		resource_type: "auto"
	}

	try {

		const response = await cloudinary.uploader.upload(file.tempFilePath, options);
		return response.secure_url;
	}
	catch (error) {
		console.log("error occured while uploading the file : ", error)
		return ""
	}

}

module.exports = fileUpload; 