import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log("inside the multer code", req , file );
    cb(null, "./temp");
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // filename + "-" + uniqueSuffix
    cb(null, file.originalname);
  },
});

 const upload = multer({ storage: storage });
export default upload;