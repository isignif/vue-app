
interface IActHistoryAttributesDefinition {
  step: string;
  act_id: number;
  user_id: number;
  signification_id?: number;
  created_at: string;
}

/**
 * API JSON Definition
 */
export interface IActHistoryDefinition {
  id: number;
  type: string;
  attributes: IActHistoryAttributesDefinition;
}

export class ActHistory {
  public id: number;
  public step: string;
  public createdAt: Date;

  constructor(definition: IActHistoryDefinition) {
    this.id = definition.id;
    this.step = definition.attributes.step;
    this.createdAt = new Date(definition.attributes.created_at);
  }

  get humanReadableStep(): string {
    switch (this.step) {
      case 'created':
        return 'Crée';
      case 'confirmed':
        return 'Confirmé';
      case 'read':
        return 'Lu';
      case 'signified':
        return 'Signifié';
      case 'complete':
        return 'Complet'
      default:
        return this.step;
    }
  }

  get color(): string {
    switch (this.step) {
      case 'created':
        return 'danger';
      case 'confirmed':
        return 'primary';
      case 'read':
        return 'info';
      case 'signified':
        return 'success';
      case 'complete':
        return 'success';
      case 'ask_cancel':
        return 'danger';
      case 'canceled':
        return 'danger';
      case 'archive':
        return 'secondary';
    }
  }

  get formatedCreatedAt(): string {
    return `${this.createdAt.toLocaleDateString('fr-FR')} ${this.createdAt.getHours()}:${this.createdAt.getMinutes()}`
  }
}
