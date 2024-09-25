import { Timestamp } from "@angular/fire/firestore";

export type ColumnKeys<T> = Array<keyof T>;

export interface Contact {
  id: number;
  Name: string;
  Barber: string;
  Hour: number;
  action: string;
  created: Timestamp;
  updated: Timestamp;
}



