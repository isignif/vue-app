import axios from 'axios';

import { Model } from './Model';
import { apiUrl } from './config';


export class Act extends Model {

  public step: string;
  public billRecipient: string;
  public billSiret: string;
  public billAddress: string;
  public billZipCode: string;
  public billTown: string;
  public billEmail: string;
  public billPhone: string;

  static get(id: number, token: string): Promise<Act> {
    const url = `${apiUrl}/acts/${id}`;

    return axios.get(url, { headers: { Authorization: token } })
      .then((resp) => {
        const act = new Act();
        const attributes = resp.data.data.attributes;
        act.id = id;
        act.billRecipient = attributes.bill_recipient;
        act.billSiret = attributes.bill_siret;
        act.billAddress = attributes.bill_address;
        act.billZipCode = attributes.bill_zip_code;
        act.billTown = attributes.bill_town;
        act.billEmail = attributes.bill_email;
        act.billPhone = attributes.bill_phone;

        return act;
      })
  }
}
