import request from "supertest";
import {app} from "../src/api";
import {loginAdminTest} from "./utility";


describe("Programmer", () => {
   
    describe("creation", () => {
        it("it should fail if we did not login", async() => {
            const data = await request(app).post('/program').expect(401);
            


        });

        // it('it should fail if deadline is exceeded', async() => {
        //     const data = await loginAdminTest();
        //     const today = new Date();
        //     const yesterday = new Date(today.setDate(today.getTime()-1));
        //     const { body: plan } = await request(app)
        //     .post('/plan')
        //     .set("Authorization", data.body.hasUser.id)
        //     .send(
        //         {
        //             title: "intori",
        //             description: "mikonam",
        //             deadline : yesterday
        //         }
        //     ).expect(200);
        //     const { body : program } = await request(app)
        //     .post('/program')
        //     .set("Authorization", data.body.hasUser.id)
        //     .send({
        //         planId: plan.id,
        //         title: "program",
        //         description: "program desc"
        //     }).expect(200)

        // })


    });



});