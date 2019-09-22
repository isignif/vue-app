import { Model, IDefinition, IDefinitionAttributes } from './Model';

interface IActAttributesDefinition extends IDefinitionAttributes {
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
export interface IActDefinition extends IDefinition {
  id: number;
  type: string;
  attributes: IActAttributesDefinition;
}

export class Act extends Model {

  public step: string;
  public billRecipient: string;
  public billSiret: string;
  public billAddress: string;
  public billZipCode: string;
  public billTown: string;
  public billEmail: string;
  public billPhone: string;

  constructor(definition: IActDefinition) {
    super(definition);
    this.billRecipient = definition.attributes.bill_recipient;
    this.billSiret = definition.attributes.bill_siret;
    this.billAddress = definition.attributes.bill_address;
    this.billZipCode = definition.attributes.bill_zip_code;
    this.billTown = definition.attributes.bill_town;
    this.billEmail = definition.attributes.bill_email;
    this.billPhone = definition.attributes.bill_phone;
  }
}
