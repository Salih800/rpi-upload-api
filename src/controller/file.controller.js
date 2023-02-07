import fs from "fs";

import { getBaseUrl } from "../utils/getBaseUrl.js";
import { uploadFileMiddleWare as uploadFile } from "../middleware/upload.js";

import { UPLOAD_FOLDER } from "../constants/index.js";

export const upload = async (req, res) => {
    try {
        await uploadFile(req, res);

        if (req.file == undefined) {
            return res.status(400).send(
                { message: "Please upload a file!" }
            );
        }

        res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.originalname,
        });
    } catch (err) {
        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "File size cannot be larger than 2MB!",
            });
        } else {
            console.log(err);
        }

        res.status(500).send({
            message: `Could not upload the file: "${req.file.originalname}": ${err}`,
        });
    }
};

export const getListFiles = (req, res) => {
    var baseurl = getBaseUrl(req);
    console.log(`Base URL: ${baseurl}`);
    const directoryPath = __basedir + UPLOAD_FOLDER;
    console.log(`Requesting files from ${directoryPath}`);
    fs.readdir(directoryPath, function (err, files) {
        let fileInfos = [];

        if (err) {
            if (err.code == "ENOENT") {
                console.log(`Directory ${directoryPath} not found.`);
                return res.status(200).send(fileInfos);
            } else {
                console.log(`Error reading directory ${directoryPath}: ${err}`);
                return res.status(500).send({
                    message: "Unable to scan files!: " + err,
                });
            }
        }
        // if (err.code == "ENOENT") {
        //     return res.status(200).send(fileInfos);
        // } else if (err) {
        //     return res.status(500).send({
        //         message: "Unable to scan files!: " + err,
        //     });
        // }

        files.forEach((file) => {
            fileInfos.push({
                name: file,
                url: baseurl + 'files/' + file,
            });
        });

        res.status(200).send(fileInfos);
    });
};

export const download = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + UPLOAD_FOLDER;

    res.download(directoryPath + fileName, fileName, (err) => {
        if (err) {
            if (err.code == "ENOENT") {
                res.status(404).send({
                    message: "File not found: " + fileName,
                });
            } else {
                res.status(500).send({
                    message: "Could not download file: " + err,
                });
            }
        }
    });
};