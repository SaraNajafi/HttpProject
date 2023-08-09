import { userInfo } from "os";
import request from "supertest";
import {app} from "../src/api";
import { loginRep } from "./utility";

describe("Plan", () => {
    const loging = async() =>{
        const data = await request(app).post('/login')
        .send({username: 'Sara', password:'sara'})
        .expect(200);
        return data;
    }
    describe("Create", () => {

        it("should send bad request if title is not string ", async() => {
            const data =  await loging();
            const today = new Date();
            const tomorrow = new Date(today.setDate(today.getDate()+1));
            const { body: plan } = await request(app)
            .post('/plan')
            .set("Authorization", data.body.hasUser.id)
            .send(
                {
                    title: "intori",
                    description: "mikonam",
                    deadline: tomorrow
                }
            ).expect(200);
            expect(plan.title).toBe("intori");
        })

        it("should fail if we didn't login", async () => {
            await request(app).post('/plan').expect(401)
        });

        it("should fail if user is not admin", async () => {
            const userData = await loginRep();
            const today = new Date();
            const tomorrow = new Date(today.setDate(today.getDate()+1));
            const {body:plan} = await request(app)
            .post('/plan')
            .set("Authorization", userData.body.hasUser.id)
            .send({
                title:'intori',
                description: "mikonam",
                deadline: tomorrow
            }).expect(403);


        });




        it("should create a new plan if we are logged in", async () => {

            const data = await loging();
            const today = new Date();
            const tomorrow = new Date(today.setDate(today.getDate()+1));
            const { body: plan } = await request(app)
            .post('/plan')
            .set("Authorization", data.body.hasUser.id)
            .send(
                {
                    title: "intori",
                    description: "mikonam",
                    deadline: tomorrow
                }
            ).expect(200);
            expect(plan.title).toBe("intori");

        });

    });


    describe("Read", () => {
        it("should read the plan", async () => {
            const data = await loging();
            const title = "intori";
            const today = new Date();
            const tomorrow = new Date(today.setDate(today.getDate()+1));
            console.log('user user '+ data.body.hasUser);
            const { body: plan } = await request(app)
            .post('/plan')
            .set("Authorization", data.body.hasUser.id)
            .send(
                {
                    title,
                    description: "mikonam",
                    deadline : tomorrow
                }
            ).expect(200);
            const {body: resultPlan} = await request(app)
            .get('/plan/'+plan.id).expect(200);

            expect(resultPlan.title).toBe("intori");



        });
    });

});