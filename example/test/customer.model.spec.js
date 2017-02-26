/**
 * Created by priyantha on 2/22/17.
 */
import { expect } from 'chai';
import Doppinakin from '../../src/doppinakin';

import dbConfig from './fixtures/database-config.fixture';
import modelConfig from './fixtures/model-config.fixture';

import Customer from '../customer.model';

describe('Customer Medel', () => {

  before(() => {
    Doppinakin.setDatabaseConfig(dbConfig);
    Doppinakin.setModelConfig(modelConfig);
  })

  it('Should create a document in the Database', async () => {
    let cusObj = new Customer();
    cusObj.name = 'Priyantha';
    cusObj.address = 'somewhere in Austin';
    let cust = await Customer.create(cusObj);
    expect(cust).to.be.instanceOf(Customer);
  });

  it('Should be able to find a document by Id and should return a Customer Object', async () => {
    let cusObj = new Customer();
    cusObj.name = 'Priyantha';
    cusObj.address = 'somewhere in Austin';
    let cust = await Customer.create(cusObj);
    let custFound = await Customer.findById(cust.id);
    expect(custFound).to.be.deep.equal(cust);
    expect(custFound).to.be.instanceOf(Customer);

    let cusObj2 = new Customer();
    cusObj2.name = 'Isurika';
    cusObj2.address = 'somewhere in Austin and California';
    let cust2 = await Customer.create(cusObj2);

    let custFound2 = await Customer.findById(cust2.id);
    expect(custFound2).to.be.deep.equal(cust2);
    expect(custFound2).to.be.instanceOf(Customer);

  });

  it('Should update the document', async () => {
    let cusObj = new Customer();
    cusObj.name = 'Priyantha';
    cusObj.address = 'somewhere in Austin';
    let cust = await Customer.create(cusObj);
    expect(cust).to.be.instanceOf(Customer);

    let cusObj2 = await Customer.findById(cust.id);
    cusObj2.name = 'Isurika';

    let custSaved = await Customer.update(cusObj2);
    expect(cust.updated_at).to.be.not.equal(custSaved.updated_at);
    expect(custSaved).to.be.instanceOf(Customer);

  })

  it('Should delete the document created', async () => {
    let cusObj = new Customer();
    cusObj.name = 'Priyantha';
    cusObj.address = 'somewhere in Austin';
    let cust = await Customer.create(cusObj);
    expect(cust).to.be.instanceOf(Customer);

    let cusObj2 = await Customer.findById(cust.id);
    cusObj2.name = 'Isurika';

    let custDeleted = await Customer.delete(cusObj2);
    expect(custDeleted).to.be.true;
  })
});