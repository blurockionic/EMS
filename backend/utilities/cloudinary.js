import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; // For file manipulation and reading from disk 
import mime from "mime-types"; // To detect MIME types based on file extension
import path from "path"; // For file path manipulation

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Cloudinary cloud name
  api_key: process.env.CLOUDINARY_API_KEY, // Cloudinary API key
  api_secret: process.env.CLOUDINARY_API_SECRET, // cloudinary API secret
});

// Supported MIME types for basic validation
const SUPPORTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif", // Images
  "video/mp4",
  "video/avi",
  "video/mkv", // Videos
  "application/pdf", // PDFs
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOC, DOCX
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // XLS, XLSX
];

const uploadOnCloudinary = async (localFilePath) => { // Upload file to Cloudinary
  try {
    if (!localFilePath) {
      throw new Error("No file path provided"); // Throw an error if no file path is provided
    }

    // Get the MIME type of the file
    const mimeType = mime.lookup(localFilePath); // Look up the MIME type of the file based on its extension
 
    if (!SUPPORTED_TYPES.includes(mimeType)) {
      throw new Error(`Unsupported file type: ${mimeType}`);
    }

    // Determine the correct resource type based on file type
    let resourceType = "auto"; // Default to 'auto'
    if (
      mimeType.startsWith("application/pdf") || // PDFs 
      mimeType.startsWith("application/") // PDFs and other documents
    ) {
      resourceType = "raw"; // Set to 'raw' for PDFs and other documents
    } else if (mimeType.startsWith("video/")) {
      resourceType = "video"; // Explicitly set 'video' for videos
    }

    // Extract the file name from the local file path
    const fileName = path.basename(localFilePath, path.extname(localFilePath)); // Remove the file extension
    const fileExtension = path.extname(localFilePath).slice(1); // Remove the leading dot
    const publicId = `${fileName}.${fileExtension}`; // Set public_id to the original file name

    // Upload file to Cloudinary with the correct resource type and public_id
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: resourceType, // Use detected resource type
      public_id: publicId, // Set public_id to the original file name
      overwrite: true, // Optional: Overwrite existing file with the same name
    });
    return response;
  } catch (error) {
    console.error("Upload failed:", error.message); // Log the error message if the upload fails 

    // Remove the locally saved temporary file as the upload operation failed
    if (fs.existsSync(localFilePath)) { // Check if the file exists on disk
      fs.unlinkSync(localFilePath); // Remove the locally saved temporary file 
    }

    return null; // Return null if the upload fails
  }
};

export { uploadOnCloudinary };
