import { Timestamp } from "@angular/fire/firestore";

export type ColumnKeys<T> = Array<keyof T>;

export interface Contact {
  id: number;
  name: string;
  barber: string;
  hour: number;
  action: string;
  created: Timestamp;
  updated: Timestamp;
}



