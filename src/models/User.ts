
/**
 * JSON Definition
 */
interface IUserAttributesDefinition {
    firstname: string;
    lastname: string;
}

export interface IUserDefinition {
    id: number;
    type: string;
    attributes: IUserAttributesDefinition;
}

export class User {
    public id: number;
    public firstName: string;
    public lastName: string;

    constructor(definition: IUserDefinition) {
        this.id = definition.id;
        this.firstName = definition.attributes.firstname;
        this.lastName = definition.attributes.lastname;
    }

    get completeName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}