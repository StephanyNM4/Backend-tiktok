import mongoose from "mongoose";

export class Database {
    constructor(){
        this.conectar();
    }

    conectar(){
        mongoose.connect('mongodb+srv://tommy:tommy1234@cluster0.16fxq5a.mongodb.net/tiktok')
        .then(respuesta=>{
            console.log("Conectado a base de datos tiktok");
        })
        .catch(respuesta=>{
            console.log("Error al conectarse a la base de datos tiktok");
        })
    }
}