import { Router } from "express";
import {v4, V4Options} from 'uuid';
import { handleExpress } from "../../utility/handle-express";
import { HttpError } from "../../utility/my-error";
import { isNonEmptyString } from "../../utility/non-empty-string";

export const app = Router();

export interface User{
    id : string;
    username : string;
    password: string;
    role : UserRole;

}
type UserRole = "Admin" | "Reperesenter" | "Normal";
export const users: User[] = [
    {id: v4(), username: 'Sara', password:'sara',role:'Admin'},
    {id: v4(), username: 'rep', password: 'rep', role: 'Reperesenter'}
]

app.post('/login', (req, res)=>{
    const {username, password} = req.body;
    
   // handleExpress(res, ()=>login({username, password}));
    if(!isNonEmptyString(username)){
            res.status(401).send({message: 'Username and password not found'});
            return;
        }
    if(!isNonEmptyString(password)){
        res.status(401).send({message: 'Username and password not found'});
        return;
        }
        const hasUser = users.find(user => username==user.username);
    if(!hasUser){
        res.status(401).send({message: 'Username and password not found'});
        return;

    }
    if(password && password === hasUser.password){
        res.status(200).send({hasUser});

    }


});



// const login = (dto:{username: string, password: string})=>{
//     if(!isNonEmptyString(dto.username)){
//         throw new HttpError(401, 'Username and password must be non-empty');
//         return;
//     }
//     if(!isNonEmptyString(dto.password)){
//         throw new HttpError(401, 'Password must be non-empty');
//         return;
//     }
//     const hasUser= users.find(user => user.username === dto.username);
//     if(!hasUser){
//         throw new HttpError(401, 'Username and password not found');
//         return;
//     }
//     // if(!dto.password && dto.password !==hasUser.password){
//     //     throw new HttpError(401, "Wrong Password");
//     // }
//     return hasUser;
// }

