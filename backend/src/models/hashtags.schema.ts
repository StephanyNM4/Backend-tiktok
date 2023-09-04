import mongoose  from "mongoose";
import { Hashtag } from "./tiktoks.model";

const schema = new mongoose.Schema<Hashtag>({
    id: String,
    hashtag: String,
    videos: Number
});

export const HashtagSchema = mongoose.model('hashtags', schema);