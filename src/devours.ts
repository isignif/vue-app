import * as JsonApi from 'devour-client';
import { apiUrl } from './config';

// Bootstrap
export const jsonApi = new JsonApi({ apiUrl });

// Define Model
// jsonApi.define("post", {
//   title: "",
//   content: "",
//   comments: {
//     jsonApi: "hasMany",
//     type: "comments"
//   }
// });

// jsonApi.define("comment", {
//   comment: ""
// });

const userAttributes = {
  email: '',
  firstname: '',
  lastname: '',
  activated: '',
  created_at: '',
  updated_at: '',
  last_work: '',
  creator_id: '',
  competence_area_id: '',
  must_reset_password: '',
  approved: '',
  address_1: '',
  address_2: '',
  zip_code: '',
  town: '',
  company_name: '',
  siret: '',
  phone: '',
  premium_until: '',
}

// const requestMiddleware = {
//   name: 'add-authorization-header',
//   req: (payload) => {
//     payload.headers = { authorization: 'todo'};
//     return payload
//   }
// }

// jsonApi.insertMiddlewareBefore('axios-request', requestMiddleware)

jsonApi.define("act_type", {
  name: ''
});

jsonApi.define("advocate", {
  ...userAttributes,
  advocate: {
    jsonApi: 'hasMany',
    type: 'comments'
  }
});

jsonApi.define("bailiff", {
  userAttributes
});

jsonApi.define("act", {
  advocate_id: '',
  act_type_id: '',
  created_at: '',
  updated_at: '',
  coefficient: '',
  express: '',
  reference: '',
  bill_reference: '',
  downloaded_at: '',
  archived_at: '',
  estimated_value_cache: '',
  bill_recipient: '',
  bill_siret: '',
  bill_address: '',
  bill_zip_code: '',
  bill_town: '',
  bill_email: '',
  bill_phone: '',
  advocate: {
    jsonApi: 'hasMany',
    type: 'comments'
  }
});

