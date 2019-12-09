import request from 'supertest'
import app from '../src/app'

describe('Test api', () => {
    it('should insert a post into db', async done => {
        request(app)
            .post('/api/post')
            .send({
                text: 'Hello',
                userId: 'ad162764-5f6b-45e3-ab2a-397887c78d1e',
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(res => {
                expect(res.body.status).toBe('Success')
            })
            .end(done)
    })
    it('should get all posts', async done => {
        request(app)
            .get('/api/post')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(res => {
                expect(res.body.status).toBe('Success')
                expect(res.body.data instanceof Array).toBeTruthy()
            })
            .end(done)
    })
    it('should update the post', async done => {
        /**
         * insert a post
         */
        request(app)
            .post('/api/post')
            .send({
                text: 'Hello',
                userId: 'ad162764-5f6b-45e3-ab2a-397887c78d1e',
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.body.status).toBe('Success')
                const postToBeModified = res.body.data.ops[0].id
                /**
                 * Request to update the post
                 */
                request(app)
                    .put(`/api/post/${postToBeModified}`)
                    .send({
                        id: postToBeModified,
                        text: "What's up?",
                        userId: 'ad162764-5f6b-45e3-ab2a-397887c78d1e',
                        createdAt: 1575873579680,
                    })
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .expect(res => {
                        expect(res.body.status).toBe('Success')
                    })
                    .end(done)
            })
    })
    it('should delete given post', async done => {
        /**
         * insert a post
         */
        request(app)
            .post('/api/post')
            .send({
                text: 'Hello',
                userId: 'ad162764-5f6b-45e3-ab2a-397887c78d1e',
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.body.status).toBe('Success')
                const postToBeModified = res.body.data.ops[0].id
                /**
                 * Request to delete the post
                 */
                request(app)
                    .delete(`/api/post/${postToBeModified}`)
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .expect(res => {
                        expect(res.body.status).toBe('Success')
                    })
                    .end(done)
            })
    })
})
