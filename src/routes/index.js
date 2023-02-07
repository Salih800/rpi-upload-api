import express from "express";
import * as controller from "../controller/file.controller.js";

const router = express.Router();

export let routes = (app) => {
    router.post("/upload", controller.upload);
    router.get("/files", controller.getListFiles);
    router.get("/files/:name", controller.download);
    router.delete("/files/:name", controller.deleteFile)

    app.use(router);
};