import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Set storage engine
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/");
	},
	filename: (req, file, cb) => {
		cb(
			null,
			`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
		);
	},
});

const postStorage = multer.diskStorage({
	destination: "./uploads/posts",
	filename: (req, file, cb) => {
		cb(
			null,
			`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
		);
	},
});

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
	api_key: process.env.CLOUDINARY_API_KEY!,
	api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const Cloud_storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		public_id: (req, file) => "posts",
	},
});

// Check file type
const checkFileType = (
	file: Express.Multer.File,
	cb: multer.FileFilterCallback
) => {
	const filetypes = /jpeg|jpg|png|gif|mp4|mov/;
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	const mimetype = filetypes.test(file.mimetype);

	if (mimetype && extname) {
		return cb(null, true);
	} else {
		cb(new Error("Error: Images and Videos Only!"));
	}
};

// Initialize upload
const upload = multer({
	storage: Cloud_storage,
	limits: { fileSize: 1024 * 1024 * 20 },
	fileFilter: (req, file, cb) => {
		checkFileType(file, cb);
	},
});

const posts = multer({
	storage: postStorage,
	limits: { fileSize: 1024 * 1024 * 20 },
	fileFilter: (req, file, cb) => {
		checkFileType(file, cb);
	},
});

export { upload, posts };
