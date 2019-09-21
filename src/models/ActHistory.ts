
/**
 * JSON Definition
 */
interface IActHistoryAttributesDefinition {
    step: string;
    act_id: number;
    user_id: number;
    signification_id?: number;
}

export interface IActHistoryDefinition {
    id: number;
    type: string;
    attributes: IActHistoryAttributesDefinition;
}

export class ActHistory {
    public id: number;
    public step: string;

    constructor(definition: IActHistoryDefinition) {
        this.id = definition.id;
        this.step = definition.attributes.step;
    }

    get humanReadableStep(): string {
        switch(this.step) {
            case 'created':
                return 'Crée';
            default:
                return this.step;

        }
    }
}
