import mongoose from "mongoose";

export interface Hashtag {
    _id?: mongoose.Types.ObjectId,
    id: string;
    hashtag: string;
    videos: number;
}