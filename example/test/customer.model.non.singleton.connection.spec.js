/**
 * Created by priyantha on 2/22/17.
 */
import Dotenv from 'dotenv';
Dotenv.config();

import {expect} from 'chai';
import Doppinakin from '../../src/doppinakin';

import dbConfig from './fixtures/database-config.fixture';
// import modelConfig from './fixtures/model-config.fixture';

import Customer from '../customer.model';

describe('Customer Model - Non singleton connection', () => {
  it('Should create a document in the Database for default connection', async () => {
    Doppinakin.setDatabaseConfig(dbConfig.connections_default);
    Doppinakin.setModelConfig(null);

    let cusObj = new Customer();
    cusObj.name = 'Priyantha';
    cusObj.address = 'somewhere in Austin';

    let cust = await Customer.create(cusObj);
    expect(cust).to.be.instanceOf(Customer);
    expect(cust.name).to.be.equal(cusObj.name);
    expect(cust.address).to.be.equal(cusObj.address);
    await Customer.delete(cusObj);
  });
});
