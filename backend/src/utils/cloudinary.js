import { v2 as cloudinary } from "cloudinary";
import { ApiError } from "./ApiError.js";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath, folderName) => {
  try {
    if (!localFilePath) return null;

    // Upload the file to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: folderName,
    });

    return uploadResult; // Return the upload result
  } catch (error) {
    throw new ApiError(500, "Error while uploading file to Cloudinary");
  }
};

const deleteFromCloudinary = async (publicId, resourceType) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
    if (result.result !== "ok" && result.result !== "not found") {
      throw new ApiError(400, "Failed to delete file from Cloudinary");
    }
  } catch (error) {
    throw new ApiError(500, "Error while deleting file from Cloudinary");
  }
};

export { deleteFromCloudinary, uploadOnCloudinary };
