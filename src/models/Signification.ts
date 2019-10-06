import axios from 'axios';

import { Model } from './Model';
import { apiUrl } from './config';
import { User } from './User';
import { Act } from './Act';

export class Signification extends Model {

  public name: string;
  public bailiffId: number;
  public actId: number;
  public townId: number;
  public bailiffComment: string;

  private _bailiff: User;
  private _act: Act;

  static all(actId: number, token: string): Promise<Signification[]> {
    const url = `${apiUrl}/acts/${actId}/significations`;

    return axios.get(url, { headers: { Authorization: token } })
      .then((resp) => {
        const included = resp.data.included;

        return resp.data.data.map((rowData) => {
          const signification = new Signification();
          signification.id = parseInt(rowData.id);
          signification.token = token;
          signification.hydrateFromAttributes(rowData.attributes, included);

          return signification;
        })
      });
  }

  static get(actId: number, id: number, token: string): Promise<Signification> {
    const url = `${apiUrl}/acts/${actId}/significations/${id}`;

    return axios.get(url, { headers: { Authorization: token } })
      .then((resp) => {
        const signification = new Signification();
        signification.token = token;
        signification.id = id;
        signification.hydrateFromAttributes(resp.data.data.attributes, resp.data.included);
        return signification;
      })
  }

  public hydrateFromAttributes(attributes: any, included: any[]): void {
    this.name = attributes.name;
    this.createdAt = attributes.created_at;
    this.updatedAt = attributes.updated_at;
    this.bailiffId = parseInt(attributes.bailiff_id);
    this.actId = parseInt(attributes.act_id);
    this.townId = parseInt(attributes.town_id);
    this.bailiffComment = attributes.bailiff_comment;

    const userData = included.find(i => i.id == this.bailiffId && i.type === "bailiff");

    if (userData) {
      this._bailiff = new User();
      this._bailiff.id = this.bailiffId;
      this._bailiff.hydrateFromAttributes(userData.attributes);
    }

    const actData = included.find(i => i.id == this.actId && i.type === "act");

    if (actData) {
      this._act = new Act();
      this._act.id = this.actId;
      this._act.hydrateFromAttributes(actData.attributes);
    }
  }

  /**
   * Get linked bailiff or make an extra HTTP query to get
   */
  public getBailiff(): Promise<User> {
    if (this._bailiff) {
      return Promise.resolve(this._bailiff);
    } else {
      return User.get(this.bailiffId, this.token)
        .then(advocate => this._bailiff = advocate);
    }
  }

  public getAct(): Promise<Act> {
    if (this._act) {
      return Promise.resolve(this._act);
    } else {
      return Act.get(this.actId, this.token)
        .then(act => this._act = act);
    }
  }

}
