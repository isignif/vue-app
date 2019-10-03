import { AppModel, IDefinition, IDefinitionAttributes } from './AppModel';

interface IUserAttributesDefinition extends IDefinitionAttributes {
  firstname: string;
  lastname: string;
}

/**
 * API JSON Definition
 */
export interface IUserDefinition extends IDefinition {
  id: number;
  type: string;
  attributes: IUserAttributesDefinition;
}

export class User extends AppModel {

  protected jsonApiType = 'users';
  protected pageSize = 30;


  get firstName() : string {
    return this.getAttribute('firstname');
  }

  get lastName(): string {
    return this.getAttribute('lastname');
  }

  get email(): string {
    return this.getAttribute('email');
  }

  get completeName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}