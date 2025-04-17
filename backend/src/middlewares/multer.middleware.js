import fs from "fs/promises";
import multer from "multer";

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/temp");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// Initialize multer with the configured storage
const upload = multer({ storage });

// Override the `single` method to include auto-deletion logic
upload.single = ((originalSingle) => {
  return function (fieldName) {
    const middleware = originalSingle.call(this, fieldName);

    return async (req, res, next) => {
      // Call the original multer middleware
      middleware(req, res, async (err) => {
        if (err) {
          return next(err);
        }

        // Schedule file deletion
        if (req.file?.path) {
          scheduleFileDeletion(req.file.path);
        }

        next();
      });
    };
  };
})(upload.single);

// Function to schedule file deletion
const scheduleFileDeletion = (filePath) => {
  setTimeout(async () => {
    // Check if the file exists and delete it
    await fs.access(filePath);
    await fs.unlink(filePath);
  }, 60000); // 60000ms = 1 minute
};

export { upload };
