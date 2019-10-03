import { createResourceLibrary } from 'active-resource';

const url = process.env.NODE_ENV === 'production' ? "https://isignif.fr/api/v1" : "https://test.isignif.fr/api/v1";

export const APILibrary = createResourceLibrary(
  url, // base url for your server
  { headers: { Authorization: 'Bearer ...' } }
);
