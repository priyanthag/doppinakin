/**
 * Created by priyantha on 2/22/17.
 */
import promisify from 'es6-promisify';
import timestamp from 'timestamp';
import Joi from 'joi';

import { isNull, isUndefined, get, forEach, set, pick, omit } from 'lodash';

import DBConnector from './lib/database/db-connector';

// base model is coupled with config for now. if this goes
// Open source as a separate module this needs to be removed

//import modelConfig from '@models/config/models.config';

let dbConfig = null;
let modelConfig = null;

// Get the connection for the given model
let getConnection = async (model) => {
  const conName = get(modelConfig, model.collection).connection;
  // get the config according to the model connection defined in the config
  const dbConnector = new DBConnector(
    get(dbConfig.connections, conName),
    conName
  );
  return await dbConnector.getConnection(conName);
}




class Doppinakin {
  constructor() {
    this._created_at = timestamp();
    this._updated_at = timestamp();
  }

  get id() {
    return this._id;
  }

  /**
   * create at and updated at Setter and Getter
   * @param config
   */
  set created_at(val) {
    this._created_at = val;
  }
  get created_at() {
    return this._created_at;
  }

  set updated_at(val) {
    this._updated_at = val;
  }
  get updated_at() {
    return this._updated_at;
  }

  static validate = Joi;

  /**
   * Database config Setter and Getter
   * @param config
   */
  static setDatabaseConfig(config) {
    dbConfig = config;
  }
  static getDatabaseConfig() {
    return dbConfig;
  }

  /**
   * Model config Setter and Getter
   * @param config
   */
  static setModelConfig(config) {
    modelConfig = config;
  }
  static getModelConfig() {
    return dbConfig;
  }

  static populateObject (data, objInstance) {
    forEach(data, (val, key) => {
      set(objInstance, key, val);
    });
    return objInstance;
  }

  static hydrate() {
    throw new Error('hydrate function must implement in the child class')
  }

  static async validateSchema(obj) {
    let schema = Joi.object().keys({
      ...this.schema,
      _created_at: Joi.date().timestamp().raw(),
      _updated_at: Joi.date().timestamp().raw(),
      _id: Joi.optional(),
    })

    //return new Promise
    let result =  Joi.validate(JSON.stringify(obj), schema);
    if (result.error !== null) {
      throw new Error (result.error);
    }
  }

  static async create(obj) {
    try {

      // Validate the object
      await this.validateSchema(obj);
      let con = await getConnection(this);
      let col = con.collection(this.collection);
      let modelObj = await col.insertOne(obj);

      if (get(modelObj.result, 'ok') === 1) {
        return modelObj.ops[0];
      } else {
        throw new Error (`Error in creating record ${JSON.stringify(obj)}`);
      }
    } catch (e) {

      throw new Error(e)
    }
  }

  static async findById(id) {
    let con = await getConnection(this);
    let col = con.collection(this.collection);
    let modelObj = await col.findOne({_id: id});
    return this.hydrate(modelObj);
  }

  static async update(obj) {
    try {
      obj.updated_at = timestamp();
      await this.validateSchema(obj);
      let con = await getConnection(this);
      let col = con.collection(this.collection);
      let modelObj = await col.updateOne(pick(obj, '_id'), {$set: omit(obj, '_id')});
      if (get(modelObj.result, 'ok') === 1) {
        return obj;
      } else {
        throw new Error (`Error in updating record ${JSON.stringify(obj)}`);
      }
    } catch (e) {
      throw new Error(e)
    }
  }
}

export default Doppinakin;