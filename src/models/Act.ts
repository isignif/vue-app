
interface IActAttributesDefinition {
    bill_recipient: string;
    bill_siret: string;
    bill_address: string;
    bill_zip_code: string;
    bill_town: string;
    bill_email: string;
    bill_phone: string;
    created_at: string;
    updated_at: string;
  }
  
  /**
   * API JSON Definition
   */
  export interface IActDefinition {
    id: number;
    type: string;
    attributes: IActAttributesDefinition;
  }
  
  export class Act {
    public id: number;
    public step: string;
    public createdAt: Date;
    public updatedAt: Date;
    public billRecipient: string;
    public billSiret: string;
    public billAddress: string;
    public billZipCode: string;
    public billTown: string;
    public billEmail: string;
    public billPhone: string;
  
    constructor(definition: IActDefinition) {
      this.id = definition.id;

      this.billRecipient = definition.attributes.bill_recipient;
      this.billSiret = definition.attributes.bill_siret;
      this.billAddress = definition.attributes.bill_address;
      this.billZipCode = definition.attributes.bill_zip_code;
      this.billTown = definition.attributes.bill_town;
      this.billEmail = definition.attributes.bill_email;
      this.billPhone = definition.attributes.bill_phone;

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
  