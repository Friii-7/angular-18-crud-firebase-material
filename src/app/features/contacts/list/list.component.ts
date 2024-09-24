import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { GridComponent } from '@components/grid/grid.component';
import { ModalComponent } from '@components/modal/modal.component';
import { ColumnKeys, Contact } from '@features/contacts/contact.interfaces';
import { ContactService } from '@features/contacts/contact.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [GridComponent],
  template: `
   <section>
      <app-grid [displayedColumns]="displayedColumns" [data]="contacts()" [sortableColumns]="sortables"/>
   </section>
  `,
})
export class ListComponent implements OnInit {
  contacts = signal<Contact[]>([]);

  displayedColumns: ColumnKeys<Contact> = ['name', 'barber', 'hour', 'action'];
  sortables: ColumnKeys<Contact> = ['name', 'barber', 'hour'];


  private readonly _contactSvc = inject(ContactService);
  private readonly _destroyRef = inject(DestroyRef);

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllContacts();
  }

  openDialog() {
    this.dialog.open(ModalComponent);
  }


  getAllContacts() {
    this._contactSvc.getAllContacts()
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        tap((contacts:Contact[]) => this.contacts.set(contacts))
      )
    .subscribe()
  }
}
