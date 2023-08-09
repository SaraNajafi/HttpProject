import request from "supertest";
import { app } from "../src/api";


export const loginAdminTest = async() =>{
    const data = await request(app).post('/login')
    .send({username: 'Sara', password:'sara'})
    .expect(200);
    return data;
}


export const loginRep = async() =>{
    const user = await request(app).post('/login')
    .send({username:'rep', password:'rep'})
    .expect(200);
    return user;

}