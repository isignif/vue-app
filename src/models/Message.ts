import axios from 'axios';

import { Model } from './Model';
import { apiUrl } from './config';
import { User } from './User';



export class Message extends Model {

  public content: string;
  public significationId: number;
  public userId: number;
  public readAt: string;

  public _user: User;

  static fromSignification(actId: number, significationId: number, token: string): Promise<Message[]> {
    const url = `${apiUrl}/acts/${actId}/significations/${significationId}/messages`;

    return axios.get(url, { headers: { Authorization: token } })
      .then((resp) => {
        const included = resp.data.included;

        return resp.data.data.map((rowData) => {
          const message = new Message();
          message.id = parseInt(rowData.id);
          message.hydrateFromAttributes(rowData.attributes, included);
          return message;
        })
      });
  }

  static get(actId: number, significationId: number, id: number, token: string): Promise<Message> {
    const url = `acts/${actId}/act_histories/${id}/messages/${id}`;

    return axios.get(url, { headers: { Authorization: token } })
      .then((resp) => {
        const message = new Message();
        message.id = id;
        message.hydrateFromAttributes(resp.data.data.attributes, resp.data.included);
        return message;
      });
  }

  public hydrateFromAttributes(attributes: any, included: any[]): void {
    this.content = attributes.content;
    this.significationId = parseInt(attributes.signification_id);
    this.userId = parseInt(attributes.user_id);
    this.createdAt = attributes.created_at;
    this.updatedAt = attributes.updated_at;
    this.readAt = attributes.read_at;

    const userData = included.find(i => i.id == this.userId && i.type === "user");

    if (userData) {
      this._user = new User();
      this._user.id = this.userId;
      this._user.hydrateFromAttributes(userData.attributes);
    }
  }

  public getUser(): Promise<User> {
    if (this._user) {
      return Promise.resolve(this._user);
    } else {
      return User.get(this.userId, this.token)
        .then(user => this._user = user);
    }
  }
}
