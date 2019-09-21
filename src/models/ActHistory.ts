
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
        switch(this.step) {
            case 'created':
                return 'Crée';
            default:
                return this.step;
        }
    }

    get formatedCreatedAt(): string {
        return `${this.createdAt.toLocaleDateString('fr-FR')} ${this.createdAt.getHours()}:${this.createdAt.getMinutes()}`
    }
}
