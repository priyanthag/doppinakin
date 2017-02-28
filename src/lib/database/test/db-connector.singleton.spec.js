import Dotenv from 'dotenv';
Dotenv.config();

import {expect} from 'chai';
import DBConnector from '../db-connector';

import dbConfig from './fixtures/database-config.fixture';

describe('DBConnection - Singleton', () => {
  it('Should return the same db connection for given config when singleton is on', async () => {
    const dbConnector = new DBConnector(dbConfig.connections_set1.apiCon, 'apiCon');
    const conn = await dbConnector.getConnection('apiCon');

    const conn2 = await dbConnector.getConnection('apiCon');
    expect(conn.timestamp).to.be.equal(conn2.timestamp);
  });

  it('Should return the db connection for given config', async () => {
    const dbConnector = new DBConnector(dbConfig.connections_set1.apiCon, 'apiCon');
    const conn = await dbConnector.getConnection('apiCon');
    expect(conn.databaseName).to.be.equal(dbConfig.connections_set1.apiCon.database);
  });

  it('Should return the db connection for given config', async () => {
    const dbConnector = new DBConnector(dbConfig.connections_set1.apiCon, 'apiCon');
    const conn = await dbConnector.getConnection('apiCon');
    expect(conn.databaseName).to.be.equal(dbConfig.connections_set1.apiCon.database);
  });

  it('Should return a valid connection for default connection', async () => {
    const dbConnector = new DBConnector(dbConfig.connections_set2);
    // get connection without connection name
    const conn = await dbConnector.getConnection();
    expect(conn.databaseName).to.be.equal(dbConfig.connections_set2.database);

    // get connection with default connection name
    const conn2 = await dbConnector.getConnection('default');
    expect(conn2.databaseName).to.be.equal(dbConfig.connections_set2.database);
  });
});
