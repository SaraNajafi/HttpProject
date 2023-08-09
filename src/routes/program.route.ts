import { Router } from "express";
import { userInfo } from "os";
import { isNonEmptyString } from "../../utility/non-empty-string";
import {users } from "./user.route"

interface Program {
    id: number;
    planId: number;
    titie : string;
    description: string;

}


export const app = Router();
const programs:Program [] =[]

app.post('/', (req, res) => {
    const userId = req.headers["authorization"]
    const loggeduser = users.find(x => x.id === userId)
    if(!loggeduser){
        res.status(401).send({message:'Unauthorized'});
        return;
    }

    const {title, description, deadline}= req.body;
    if(!isNonEmptyString(title)){
        res.status(400).send({message:'title must be a string'});
        return;
    }
    const program = {
        id : programs.length+1,

    }
});


