export default {
  connections: {
    apiCon: {
      host: 'localhost',
      port: '27017',
      username: '',
      password: '',
      database: 'doppinakin-api-test',
      singleton: true,
      connectionPoolSize: 20,
    },
    logCon: {
      host: 'localhost',
      port: '27017',
      username: '',
      password: '',
      database: 'doppinakin-log-test',
      singleton: true,
      connectionPoolSize: 20,
    }
  },
}