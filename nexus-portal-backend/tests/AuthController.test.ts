
import request from 'supertest';
import { app } from '../src/index';

describe("AuthController /signup ", () => {
    it('POST /signup with correct payload returns ok true, status 200.', 
        async () => {
            const Basile = { "name" : "Basile", "email" : "baba.ausile@gmail.com", "tel" : "06121212", "password" :  "mot-de-passe-fou12", "isAdmin" : false, "user_type" : 0, "classGroup" : "RA1", "year" : 3 }

            const response = await request(app)
            .post('/login')
            .send(Basile)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                if(err) {
                    throw err;
                }

                console.log(res.body);
            });

            expect(response).toHaveProperty("ok")
            expect(response).toHaveProperty("status")
            expect(response.status).toBe(200);
            expect(response.ok).toBe(true);
     });
});


describe("AuthController /login", () => {
    it("POST /signup with a signed in user and correct payload returns ok true, status 200 with 'data' array",
        async () => {
            const Basile_Login = { "data" : { "email" : "baba.ausile@gmail.com", "password" : "mot-de-passe-fou12" } }
            
            const response = await request(app)
            .post('/login')
            .send(Basile_Login)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                if(err) {
                    throw err;
                }

                console.log(res.body);
            });

            expect(response).toHaveProperty("ok")
            expect(response).toHaveProperty("status")
            expect(response.status).toBe(200);
            expect(response.ok).toBe(true);
            expect(response).toHaveProperty("data")
        }
    )
});