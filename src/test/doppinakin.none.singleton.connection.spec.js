/**
 * Created by priyantha on 2/22/17.
 */
import Dotenv from 'dotenv';
Dotenv.config();

import {expect} from 'chai';
import Doppinakin from '../doppinakin';

import dbConfig from './fixtures/database-config.fixture';
import modelConfig from './fixtures/model-config.fixture';

describe('Doppinakin - None singleton connection', () => {
  it('Should model create a link to database', () => {
    Doppinakin.setDatabaseConfig(dbConfig.connections);
    Doppinakin.setModelConfig(modelConfig);

    let tempModel = new Doppinakin();
    expect(tempModel.createdAt).to.be.not.null;
    expect(tempModel.createdAt).to.be.not.undefined;
    expect(tempModel.updatedAt).to.be.not.null;
    expect(tempModel.updatedAt).to.be.not.undefined;
  });

  it('Should model create a link to database for default connections', () => {
    Doppinakin.setDatabaseConfig(dbConfig.connections_default);
    Doppinakin.setModelConfig(modelConfig);

    let tempModel = new Doppinakin();
    expect(tempModel.createdAt).to.be.not.null;
    expect(tempModel.createdAt).to.be.not.undefined;
    expect(tempModel.updatedAt).to.be.not.null;
    expect(tempModel.updatedAt).to.be.not.undefined;
  });
});
