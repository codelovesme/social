import request from 'supertest'
import app from '../src/index'

describe('Get all posts', () => {
    it('responds with json', done => {
        request(app)
            .get('/post')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
    })
})
