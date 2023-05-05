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
      version: '2023-07',
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

    this.request = new Request(this);
    this.checkout = new Checkout(this);
    this.cart = new Cart(this);
    this.product = new Product(this);

    // TODO: Deprecate these: pascal case should be reserved for constructor functions that must be used with the 'new' prefix
    this.Request = this.request;
    this.Checkout = this.checkout;
    this.Cart = this.cart;
    this.Product = this.product;
  }

  static fromSettings(settings = {}) {
    return new Client(settings);
  }

  getSettings() {
    return this.#settings;
  }
}

export default Client;
