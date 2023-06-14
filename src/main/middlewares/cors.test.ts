import request from 'supertest'
import app from '@main/config/app'

describe('CORS Middleware', () => {
  it('Should anabled cors', async () => {
    app.post('/test_cors', (req, res) => {
      res.send()
    })
    await request(app)
      .post('/test_cors')
      .send()
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})
