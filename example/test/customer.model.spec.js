/**
 * Created by priyantha on 2/22/17.
 */
import Dotenv from 'dotenv';
Dotenv.config();

import {expect} from 'chai';
import Doppinakin from '../../src/doppinakin';

import dbConfig from './fixtures/database-config.fixture';
import modelConfig from './fixtures/model-config.fixture';

import Customer from '../customer.model';

describe('Customer Model', () => {
  before(() => {
    Doppinakin.setDatabaseConfig(dbConfig.connections);
    Doppinakin.setModelConfig(modelConfig);
  });

  it('Should provide a default Customer object even if the constructor is loaded', async () => {
    let cusObj = new Customer({});
    expect(cusObj.name).to.be.null;
    expect(cusObj.address).to.be.null;
  });

  it('Should create a document in the Database', async () => {
    let cusObj = new Customer();
    cusObj.name = 'Priyantha';
    cusObj.address = 'somewhere in Austin';

    let cust = await Customer.create(cusObj);
    expect(cust).to.be.instanceOf(Customer);
    expect(cust.name).to.be.equal(cusObj.name);
    expect(cust.address).to.be.equal(cusObj.address);
    await Customer.delete(cusObj);
  });

  it('Should be able to find a document by Id and should return a Customer Object', async () => {
    let cusObj = new Customer();
    cusObj.name = 'Priyantha';
    cusObj.address = 'somewhere in Austin';
    let cust = await Customer.create(cusObj);
    let custFound = await Customer.findById(cust.id);
    expect(custFound).to.be.deep.equal(cust);
    expect(custFound).to.be.instanceOf(Customer);
    await Customer.delete(custFound);

    let cusObj2 = new Customer();
    cusObj2.name = 'Isurika';
    cusObj2.address = 'somewhere in Austin and California';
    let cust2 = await Customer.create(cusObj2);
    let custFound2 = await Customer.findById(cust2.id);
    expect(custFound2).to.be.deep.equal(cust2);
    expect(custFound2).to.be.instanceOf(Customer);
    await Customer.delete(custFound2);
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
    await Customer.delete(cusObj2);
  });

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
  });

  it('Should populate the Customer object on a JSON', async () => {
    let cusObj = new Customer();
    cusObj.name = 'Priyantha';
    cusObj.address = 'somewhere in Austin';

    const cusStr = JSON.stringify(cusObj);

    let newCusJSON = JSON.parse(cusStr);
    expect(newCusJSON).to.be.instanceOf(Object);

    let newCusObj = Customer.hydrate(newCusJSON);
    expect(newCusObj).to.be.instanceOf(Customer);
  });


  it('Should populate the Empty Customer object when JSON is undefined', async () => {
    let cusObj = new Customer();
    cusObj.name = 'Priyantha';
    cusObj.address = 'somewhere in Austin';

    const cusStr = JSON.stringify(cusObj);

    let newCusJSON = JSON.parse(cusStr);
    expect(newCusJSON).to.be.instanceOf(Object);

    let newCusObj = Customer.hydrate();
    expect(newCusObj.name).to.be.null;
    expect(newCusObj.address).to.be.null;
  });

});
