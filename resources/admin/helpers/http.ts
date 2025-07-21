export const getHeaders = () => ({
  'Content-Type': 'application/json',
  'X-WP-Nonce': wpApiSettings.nonce,
});
export const getNonceHeaders = () => ({
  'X-WP-Nonce': wpApiSettings.nonce,
});
