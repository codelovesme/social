import request from 'supertest'
import app from '../src/index'
import { Post } from '../src/model'

describe('Test api', () => {
    it('should insert a post into db', done => {
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
    it('should get all posts', done => {
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
    it('should update the post', done => {
        /**
         * fetch all posts
         */
        request(app)
            .get('/api/post')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(res => {
                const posts: Post[] = res.body.data
                const postToBeModified = posts[0]
                const modifiedPost = {
                    ...postToBeModified,
                    text: 'Hello World',
                }
                /**
                 * Request to update a post
                 */
                request(app)
                    .put(`/api/post/${postToBeModified.id}`)
                    .send(modifiedPost)
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .expect(res => {
                        expect(res.body.status).toBe('Success')
                        expect(res.body.data instanceof Array).toBeTruthy()
                    })
                    .end(done)
            })
            .end()
    })
    it('should delete given post', done => {
        /**
         * fetch all posts
         */
        request(app)
            .get('/api/post')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(res => {
                const posts: Post[] = res.body.data
                const postToBeRemoved = posts[0]
                /**
                 * Request to update a post
                 */
                request(app)
                    .delete(`/api/post/${postToBeRemoved.id}`)
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .expect(res => {
                        expect(res.body.status).toBe('Success')
                        expect(res.body.data instanceof Array).toBeTruthy()
                    })
                    .end(done)
            })
            .end()
    })
})
