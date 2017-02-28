const dbConfig = {
  connections_set1: {
    apiCon: {
      host: process.env.MONGODB_API_HOST || 'localhost',
      port: process.env.MONGODB_API_PORT || '27017',
      username: process.env.MONGODB_API_USERNAME || '',
      password: process.env.MONGODB_API_PASSWORD || '',
      database: 'doppinakin-api-test',
      singleton: true,
      connectionPoolSize: 20,
    },
    logCon: {
      host: process.env.MONGODB_LOG_HOST || 'localhost',
      port: process.env.MONGODB_LOG_PORT || '27017',
      username: process.env.MONGODB_LOG_USERNAME || '',
      password: process.env.MONGODB_LOG_PASSWORD || '',
      database: 'doppinakin-log-test',
      singleton: true,
      connectionPoolSize: 20,
    },
  },
  connections_set2: {
    host: process.env.MONGODB_API_HOST || 'localhost',
    port: process.env.MONGODB_API_PORT || '27017',
    username: process.env.MONGODB_API_USERNAME || '',
    password: process.env.MONGODB_API_PASSWORD || '',
    database: 'doppinakin-api-test',
    singleton: true,
    connectionPoolSize: 20,
  },
  connections_set3: {
    host: process.env.MONGODB_API_HOST || 'localhost',
    port: process.env.MONGODB_API_PORT || '27017',
    username: process.env.MONGODB_API_USERNAME || '',
    password: process.env.MONGODB_API_PASSWORD || '',
    database: 'doppinakin-api-test',
    singleton: false,
    connectionPoolSize: 20,
  },
};

export default dbConfig;
