import { CommerceError, throwUserErrors } from './errors';
import { normalizeCart } from './normalize';

export function unwrapCartPayload(cartPayload = {}) {
  const { userErrors, cart } = cartPayload;

  throwUserErrors(userErrors);

  if (!cart) {
    throw new CommerceError({ message: 'Missing cart object from response' });
  }

  return normalizeCart(cart);
}
