import { Model, IDefinition, IDefinitionAttributes } from './Model';
import axios from 'axios'


export class User extends Model {
  public id: number;
  public readonly type = "advocates";

  public email: string;
  public firstName: string;
  public lastName: string;
  public activated: string;
  
  public lastWork: string;
  public creatorId: number;
  public competenceAreaId: number;
  public mustResetPassword: boolean;
  public approved: boolean;
  public address1: string;
  public address2: string;
  public zipCode: string;
  public town: string;
  public companyName: string;
  public siret: string;
  public phone: string;
  public premiumUntil: string;


  static get(id: number, token: string): Promise<User> {
    const user = new User();

    const url = `${user.baseUrl}/${id}`;

    return axios.get(url, {headers: { Authorization: token}})
          .then((resp) => {
            const attributes = resp.data.data.attributes;
            
            user.id = id;
            user.email = attributes.email;
            user.firstName = attributes.firstname;
            user.lastName = attributes.lastname;
            user.activated = attributes.activated;
            user.createdAt = attributes.created_at;
            user.updatedAt = attributes.updated_at;
            user.lastWork = attributes.last_work;
            user.creatorId = parseInt(attributes.creator_id);
            user.competenceAreaId = parseInt(attributes.competence_area_id);
            user.mustResetPassword = attributes.must_reset_password;
            user.approved = attributes.approved;
            user.address1 = attributes.address_1;
            user.address2 = attributes.address_2;
            user.zipCode = attributes.zip_code;
            user.town = attributes.town;
            user.companyName = attributes.company_name;
            user.siret = attributes.siret;
            user.phone = attributes.phone;
            user.premiumUntil = attributes.premium_until;

            return user;
          })
          .catch(e => {
            console.error(e);
            return null;
          })
  }

  get completeName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}