import axios from 'axios';

import { Model } from './Model';
import { apiUrl } from './config';
import { User } from './User';
import { ActType } from './ActType';
import { Signification } from './Signification';

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

  private _advocate: User;
  private _actType: ActType;
  private _significations: Signification[];

  static all(token: string): Promise<Act[]> {
    const url = `${apiUrl}/acts`;

    return axios.get(url, { headers: { Authorization: token } })
      .then((resp) => {
        const included = resp.data.included;

        return resp.data.data.map((actData) => {
          const act = new Act();
          act.id = parseInt(actData.id);
          act.token = token;
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
        act.token = token;
        act.id = id;
        act.hydrateFromAttributes(resp.data.data.attributes, resp.data.included);
        return act;
      })
  }

  public hydrateFromAttributes(attributes: any, included: any[] = []): void {
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
      this._advocate = new User();
      this._advocate.id = this.advocateId;
      this._advocate.hydrateFromAttributes(userData.attributes);
    }

    const actTypeData = included.find(i => i.id == this.actTypeId && i.type === "act_type");

    if (actTypeData) {
      this._actType = new ActType();
      this._actType.id = this.actTypeId;;
      this._actType.hydrateFromAttributes(actTypeData.attributes);
    }
  }

  // RELATIONS

  /**
   * Get linked advocate or make an extra HTTP query to get
   */
  public getAdvocate(): Promise<User> {
    if (this._advocate) {
      return Promise.resolve(this._advocate);
    } else {
      return User.get(this.advocateId, this.token)
        .then(advocate => this._advocate = advocate);
    }
  }

  public getActType(): Promise<ActType> {
    if (this._actType) {
      return Promise.resolve(this._actType);
    } else {
      return ActType.get(this.actTypeId, this.token)
        .then(actType => this._actType = actType);
    }
  }

  public getSignifications(): Promise<Signification[]> {
    if (this._significations) {
      return Promise.resolve(this._significations);
    } else {
      return Signification.all(this.id, this.token)
        .then(significations => this._significations = significations);
    }
  }

  // METHODS

  public save(token: string = null): Promise<Act> {
    if (this.id) throw new Error('TODO: update')

    if (token) this.token = token;
    if (!this.token) throw new Error('You must provide a valid JWT token.');

    const formData = new FormData();
    formData.append('act[express]', String(this.express));
    formData.append('act[act_type_id]', String(this.actTypeId));
    formData.append('act[reference]', this.reference);
    formData.append('act[bill_reference]', this.billReference);
    formData.append('act[bill_recipient]', this.billRecipient);
    formData.append('act[bill_zip_code]', this.billZipCode);
    formData.append('act[bill_town]', this.billTown);
    formData.append('act[bill_address]', this.billAddress);
    formData.append('act[bill_siret]', this.billSiret);
    formData.append('act[bill_email]', this.billEmail);
    formData.append('act[bill_phone]', this.billPhone);

    return axios.post(`${apiUrl}/acts`, formData, { headers: { Authorization: this.token } })
      .then(response => {
        const responseData = response.data;
        this.id = parseInt(responseData.data.id);
        return this;
      });
  }

  get name(): string {
    return this.reference || `Acte N°${this.id}`;
  }
}
