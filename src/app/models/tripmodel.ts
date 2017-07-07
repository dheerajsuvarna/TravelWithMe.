import {User} from '../models/usermodel'
import {Interest} from '../../models/Enums/Interest'


export class Trip {

  source: string;
  destination: string;
  budget: Number;
  tripName: string;
  user:User;
  interests: [Interest];
  description:string;
  startDate:string;
  endDate:string;
  numOfPeople: Number;
}

