import { MongoHelper } from '@infra/db/mongoDb/helpers/mongoHelper'
import env from './config/env'

void MongoHelper.connect(env.MONGO_URL)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.PORT, () => console.log(`server is running at http://localhost:${env.PORT}`))
  })
  .catch(console.error)
