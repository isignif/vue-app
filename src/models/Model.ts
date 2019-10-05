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
  public createdAt: string;
  public updatedAt: string;

  protected token: string;

  get createdAtDate(): Date {
    return new Date(this.createdAt);
  }

  get updatedAtDate(): Date {
    return new Date(this.updatedAt);
  }

  get formatedCreatedAt(): string {
    return `${this.createdAtDate.toLocaleDateString('fr-FR')} ${this.createdAtDate.getHours()}:${this.createdAtDate.getMinutes()}`
  }

  get formatedUpdatedAt(): string {
    return `${this.updatedAtDate.toLocaleDateString('fr-FR')} ${this.updatedAtDate.getHours()}:${this.updatedAtDate.getMinutes()}`
  }
} 