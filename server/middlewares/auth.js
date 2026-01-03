import "dotenv/config";
import bcrypt from "bcrypt";
import jwt, { decode } from "jsonwebtoken";

const auth = async (req,res,next) =>{
   const header = req.headers.authorization;
   if ( !header || !header.startswith("Bearer ")){
    return res.status(400).json({error:"no token provided"});
   }
   const token = header.split(" ")[1];
   const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
   req.user = decoded;
}