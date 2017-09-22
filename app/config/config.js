export default {
  env: 'development',
  database: {
    host: 'localhost',
    port: 27017,
    db: 'playground',
    // url: 'mongodb://database:27017/playground',      # for docker compose
    url: 'mongodb://127.0.0.1:27017/playground',
  },
  key: {
    privateKey: '37LvDSm4XvjYOh9Y',
    tokenExpiry: 1 * 30 * 1000 * 60 // 1 hour
  },
};
