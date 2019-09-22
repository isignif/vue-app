import { Model, IDefinition, IDefinitionAttributes } from './Model';

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

export class User extends Model {
  public id: number;
  public firstName: string;
  public lastName: string;

  constructor(definition: IUserDefinition) {
    super(definition);
    this.firstName = definition.attributes.firstname;
    this.lastName = definition.attributes.lastname;
  }

  get completeName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}