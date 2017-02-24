import Joi from 'joi';
import Dopppinakin from '../src/doppinakin';
import { isNull, isUndefined, get, forEach, set } from 'lodash';

class Customer extends Dopppinakin {

  constructor() {
    super();
    this._name = null;
    this._address = null;
  }

  get name() {
    return this._name;
  }
  set name(val) {
    this._name = val;
  }

  get address() {
    return this._address;
  }
  set address(val) {
    this._address = val;
  }

  isAuthenticated() {
    return false;
  }

  static hydrate(json) {
    return Dopppinakin.populateObject(json, new Customer());
  }

}

Customer.collection = 'customers'; // the mongodb collection name

Customer.schema = {
  _name: Dopppinakin.validate.string().required(),
  _address: Dopppinakin.validate.string().required(),
};

export default Customer;
