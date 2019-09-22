export interface IDefinitionAttributes{
  created_at: string;
  updated_at: string;
}

/**
 * API JSON Definition
 */
export interface IDefinition {
  id: number;
  type: string;
  attributes: IDefinitionAttributes;
}

export abstract class Model {
  public id: number;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(definition: IDefinition) {
    this.id = definition.id;
    this.createdAt = new Date(definition.attributes.created_at);
    this.updatedAt = new Date(definition.attributes.updated_at);
  }

  get formatedCreatedAt(): string {
    return `${this.createdAt.toLocaleDateString('fr-FR')} ${this.createdAt.getHours()}:${this.createdAt.getMinutes()}`
  }

  get formatedUpdatedAt(): string {
    return `${this.updatedAt.toLocaleDateString('fr-FR')} ${this.updatedAt.getHours()}:${this.updatedAt.getMinutes()}`
  }
} 