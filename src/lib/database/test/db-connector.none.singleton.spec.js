import Dotenv from 'dotenv';
Dotenv.config();

import {expect} from 'chai';
import DBConnector from '../db-connector';

import dbConfig from './fixtures/database-config.fixture';

describe('DBConnection - None singleton', () => {
  it('Should return an exception when config are not provided', async () => {
    expect(() => {
      new DBConnector();
    }).to.throw(Error);
  });

  it('Should return the db connection for given config', async () => {
    const dbConnector = new DBConnector(dbConfig.connections_set3);
    const conn = await dbConnector.getConnection();

    const conn2 = await dbConnector.getConnection();
    expect(conn.timestamp).to.be.not.equal(conn2.timestamp);
  });
});

