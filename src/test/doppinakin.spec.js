/**
 * Created by priyantha on 2/22/17.
 */
import Dotenv from 'dotenv';
Dotenv.config();

import { expect } from 'chai';
import Doppinakin from '../doppinakin';

import dbConfig from './fixtures/database-config.fixture';
import modelConfig from './fixtures/model-config.fixture';

describe('Doppinakin', () => {

  before(() => {
    //Doppinakin.setDatabaseConfig(dbConfig)
    //Doppinakin.setModelConfig(modelConfig)
  })

  it('Should model create a link to database', () => {

    //let tempModel = new Doppinakin();
    // @TODO - more test case should be written

  })


});