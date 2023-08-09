import { Response } from "express";
import { HttpError } from "./my-error";
export const handleExpress= <A>(res:Response, fn:()=>A)=>{
    try{
    const data = fn();
    res.status(200).send(data);
    }catch(err){
        if(err instanceof HttpError){
            res.status(err.status).send({message:err.message});
            return;
        }
    }

    
}