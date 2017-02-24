import { expect } from 'chai';
import DBConnector from '../db-connector';

import dbConfig from './fixtures/database-config.fixture';

describe('DBConnection', () => {

  it('Should return the db connection for given config', async () => {
    const dbConnector = new DBConnector(dbConfig.connections.apiCon, 'apiCon');
    const conn = await dbConnector.getConnection('apiCon');
    expect(conn.databaseName).to.be.equal(dbConfig.connections.apiCon.database);
  })



});