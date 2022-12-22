import Checkout from './Checkout';
import Request from './Request';
import Cart from './Cart';
import Product from './Product';

class Client {
  #settings = {
    shop: {
      myshopify_domain: '',
      language_code: 'EN',
      country_code: 'US',
    },
    api: {
      token: '',
      version: '2023-01',
    },
  };

  constructor(settings = {}) {
    this.#settings = {
      shop: {
        ...this.#settings.shop,
        ...settings.shop,
      },
      api: {
        ...this.#settings.api,
        ...settings.api,
      },
    };
    this.Request = new Request(this);
    this.Checkout = new Checkout(this);
    this.Cart = new Cart(this);
    this.Product = new Product(this);
  }

  static fromSettings(settings = {}) {
    return new Client(settings);
  }

  getSettings() {
    return this.#settings;
  }
}

export default Client;
