export default {
  MONGO_URL: process.env.MONGODB_URL || 'mongodb://localhost:27017/clean_node_api_mango',
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || 'danger=codeds'
}
