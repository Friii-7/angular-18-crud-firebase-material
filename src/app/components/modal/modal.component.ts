import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ModalService } from '@components/modal/modal.service';
import { ContactService } from '@features/contacts/contact.service';
import { APP_CONSTANTS } from '@shared/constants';
import { SnackBarService } from '@shared/services/snack-bar.service';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';

const MATERIAL_MODULES = [MatLabel, MatFormField, MatInput, MatDialogModule, MatButtonModule, MatOption, MatSelectModule]
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ReactiveFormsModule, MATERIAL_MODULES, NgxMatTimepickerModule, CommonModule],
  templateUrl: './modal.component.html' ,
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit {

  contact_Form!: FormGroup;
  barbers = ['Barbero 1', 'Barbero 2', 'Barbero 3'];


  private readonly _fb = inject(FormBuilder);
  private readonly _matDialog = inject(MAT_DIALOG_DATA);
  private readonly _contactSvc = inject(ContactService);
  private readonly _modalSvc = inject(ModalService);
  private readonly _snackBar = inject(SnackBarService);

  ngOnInit(): void {
    this._buildForm();
    this.contact_Form.patchValue(this._matDialog.data);
  }


  async onSubmit() {
    let message = APP_CONSTANTS.MESSAGES.CONTACT_UPDATED;
    const contact = this.contact_Form.value;

    if (this._matDialog.data) {
      this._contactSvc.updateContact(this._matDialog.data.id, contact);
    } else {
      await this._contactSvc.newContact(contact);
      message = APP_CONSTANTS.MESSAGES.CONTACT_ADDED;
    }
    this._snackBar.showSnackBar(message);
    this._modalSvc.closeModal();
  }

  getTitle(): string {
    return this._matDialog.data ? 'Edit Contact' : 'Add Contact';
  }


  private _buildForm(): void {
    this.contact_Form = this._fb.nonNullable.group({
      Name: ['', Validators.required],
      Barber: ['', Validators.required],
      Hour: ['', Validators.required],
    });
  }



}
