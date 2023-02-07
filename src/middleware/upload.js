import multer from "multer";
import util from "util";
import { UPLOAD_FOLDER } from "../constants/index.js";
import { make_folders } from "../utils/make_folders.js";

const maxSize = 2 * 1024 * 1024;

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        var upload_path = __basedir + UPLOAD_FOLDER;
        make_folders(upload_path);
        cb(null, upload_path);
    },
    filename: (req, file, cb) => {
        console.log("Uploading file: " + file.originalname);
        cb(null, file.originalname);
    },
});

let uploadFile = multer({
    storage: storage,
    limits: {fileSize: maxSize},
}).single("file");

export let uploadFileMiddleWare = util.promisify(uploadFile);