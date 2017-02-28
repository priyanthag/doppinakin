import {isUndefined, set, get, isEmpty} from 'lodash';
import {MongoClient} from 'mongodb';
import promisify from 'es6-promisify';
import timestamp from 'timestamp';

// multiple different connections can be stored
let dbCon = {};

// store the config settings
let dbConfig = {

};

let getConnection = async (connectionName) => {
  const auth = isEmpty(get(dbConfig, `${connectionName}.username`))
    ? ''
    : `${get(dbConfig, `${connectionName}.username`)}:${get(dbConfig, `${connectionName}.password`)}@`; // eslint-disable-line max-len
  let url = `mongodb://${auth}${get(dbConfig, `${connectionName}.host`)}:${get(dbConfig, `${connectionName}.port`)}/${get(dbConfig, `${connectionName}.database`)}`; // eslint-disable-line max-len

  if (
    (
      get(dbConfig, `${connectionName}.singleton`)
      && isUndefined(get(dbCon, connectionName))
    )
    || !get(dbConfig, `${connectionName}.singleton`)
  ) {
    let con = await promisify(MongoClient.connect)(url);
    con.timestamp = timestamp();
    set(dbCon, connectionName, con);
  }
  return get(dbCon, connectionName);
};

class DBConnector {

  constructor(config, connectionName) {
    if (isEmpty(connectionName)) {
      connectionName = 'default';
    }
    if (isUndefined(config)) {
      throw new Error('Config must be provided');
    }

    // if the db connection in singleton mode
    if (config.singleton && isUndefined(get(dbCon, connectionName))) {
      set(dbConfig, connectionName, config);
    } else if (!config.singleton) {
      set(dbConfig, connectionName, config);
    }
  };

  async getConnection(connectionName) {
    if (isEmpty(connectionName)) {
      connectionName = 'default';
    }
    return await getConnection(connectionName);
  };

};

export default DBConnector;
