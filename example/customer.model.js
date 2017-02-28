import Dopppinakin from '../src/doppinakin';

class Customer extends Dopppinakin {

  constructor() {
    super();
    this.name = null;
    this.address = null;
  }

  /**
   * This must be implemented in each model
   * @param {Object} json
   * @return {Customer}
   */
  static hydrate(json) {
    return Dopppinakin.populateObject(json, new Customer());
  }
}

Customer.collection = 'customers'; // the mongodb collection name

Customer.schema = {
  name: Dopppinakin.validate.string().required(),
  address: Dopppinakin.validate.string().required(),
};

export default Customer;
