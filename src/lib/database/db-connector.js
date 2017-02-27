import { isUndefined, set, get } from 'lodash';
import { MongoClient } from 'mongodb';
import promisify from 'es6-promisify';

// multiple different connections can be stored
let dbCon = {};

// store the config settings
let dbConfig = {

};

let getConnection = async (connectionName) => {
  let url = `mongodb://${get(dbConfig, `${connectionName}.username`)}:${get(dbConfig, `${connectionName}.password`)}@${get(dbConfig, `${connectionName}.host`)}:${get(dbConfig, `${connectionName}.port`)}/${get(dbConfig, `${connectionName}.database`)}`;
  if (
    (get(dbConfig, `${connectionName}.singleton`)
      && isUndefined(get(get(dbCon, connectionName)))
    )
    || !get(dbConfig, `${connectionName}.singleton`)
  ) {
    set(dbCon, connectionName, promisify(MongoClient.connect)(url));
  }
  return get(dbCon, connectionName);
}

class DBConnector {

  constructor(config, connectionName) {
    if (isUndefined(connectionName)) {
      throw new Error('Connection name must be provided')
    }
    if (isUndefined(config)) {
      throw new Error('Config must be provided')
    }

    // if the db connection in singleton mode
    if (config.singleton && isUndefined(get(dbCon, connectionName))){
      set(dbConfig, connectionName, config);
    } else if (!config.singleton) {
      set(dbConfig, connectionName, config);
    }
  }

  async getConnection(connectionName) {
    return await getConnection(connectionName);
  }

}

export default DBConnector;