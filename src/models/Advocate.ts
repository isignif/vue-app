import { User } from './User';

export class Advocate extends User {

  protected jsonApiType = 'advocates';
  protected pageSize = 30;


}