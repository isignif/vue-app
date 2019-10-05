import axios from 'axios';

import { Model } from './Model';
import { apiUrl } from './config';
import { User } from './User';
import { ActType } from './ActType';


export class Act extends Model {

  public step: string;
  public billRecipient: string;
  public billSiret: string;
  public billAddress: string;
  public billZipCode: string;
  public billTown: string;
  public billEmail: string;
  public billPhone: string;

  public advocateId: number;
  public actTypeId: number;
  public coefficient: number;
  public express: boolean;
  public reference: string;
  public billReference: string;
  public downloadedAt: string;
  public archivedAt: string;
  public estimatedValueCache: string;

  public currentStep: string;

  public advocate: User;
  public actType: ActType;

  static all(token: string): Promise<Act[]> {
    const url = `${apiUrl}/acts`;

    return axios.get(url, { headers: { Authorization: token } })
      .then((resp) => {
        const included = resp.data.included;

        return resp.data.data.map((actData) => {
          const act = new Act();
          act.id = parseInt(actData.id);
          act.hydrateFromAttributes(actData.attributes, included);

          return act;
        })
      });
  }


  static get(id: number, token: string): Promise<Act> {
    const url = `${apiUrl}/acts/${id}`;

    return axios.get(url, { headers: { Authorization: token } })
      .then((resp) => {
        const act = new Act();
        act.id = id;
        act.hydrateFromAttributes(resp.data.data.attributes, resp.data.included);
        return act;
      })
  }

  public hydrateFromAttributes(attributes: any, included: any[]): void {
    this.billRecipient = attributes.bill_recipient;
    this.billSiret = attributes.bill_siret;
    this.billAddress = attributes.bill_address;
    this.billZipCode = attributes.bill_zip_code;
    this.billTown = attributes.bill_town;
    this.billEmail = attributes.bill_email;
    this.billPhone = attributes.bill_phone;

    this.advocateId = attributes.advocate_id;
    this.actTypeId = parseInt(attributes.act_type_id);
    this.coefficient = parseInt(attributes.coefficient);
    this.express = attributes.express;
    this.reference = attributes.reference;
    this.billReference = attributes.billReference;
    this.estimatedValueCache = attributes.estimated_value_cache;
    this.currentStep = attributes.current_step;

    const userData = included.find(i => i.id == this.advocateId && i.type === "advocate");

    if (userData) {
      this.advocate = new User();
      this.advocate.id = this.advocateId;
      this.advocate.hydrateFromAttributes(userData.attributes);
    }

    const actTypeData = included.find(i => i.id == this.actTypeId && i.type === "act_type");

    if (actTypeData) {
      this.actType = new ActType();
      this.actType.id = this.actTypeId;;
      this.actType.hydrateFromAttributes(actTypeData.attributes);
    }
  }

  get name(): string {
    return this.reference || `Acte N°${this.id}`;
  }
}
