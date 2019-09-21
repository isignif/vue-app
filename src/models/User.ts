
/**
 * JSON defintion
 */
interface IUserAttributesDefintion {
    firstname: string;
    lastname: string;
}

export interface IUserDefintion {
    id: number;
    type: string;
    attributes: IUserAttributesDefintion;
}

export class User {
    public id: number;
    public firstName: string;
    public lastName: string;

    constructor(definition: IUserDefintion) {
        this.id = definition.id;
        this.firstName = definition.attributes.firstname;
        this.lastName = definition.attributes.lastname;
    }

    get completeName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}