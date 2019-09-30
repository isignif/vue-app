const api_url = process.env.NODE_ENV === 'production' ? "https://isignif.fr/api/v1" : "https://test.isignif.fr/api/v1"

module.exports = {
  api_url
};
