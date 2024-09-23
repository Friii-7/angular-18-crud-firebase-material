import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { APP_CONSTANTS } from '@shared/constants';
import { SnackBarService } from '@shared/services/snack-bar.service';
import { ContactService } from '../contact.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatLabel, MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';


const MATERIAL_MODULES = [MatLabel, MatFormField, MatInput, MatDialogModule, MatButtonModule]

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [MATERIAL_MODULES, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent implements OnInit {

  contact_Form!: FormGroup;

  private readonly _fb = inject(FormBuilder);
  private readonly _contactSvc = inject(ContactService);
  private readonly _snackBar = inject(SnackBarService);

  ngOnInit(): void {
    this._buildForm();
  }

  async onSubmit() {
    let message = APP_CONSTANTS.MESSAGES.CONTACT_ADDED;
    const contact = this.contact_Form.value;

    await this._contactSvc.newContact(contact);
    this._snackBar.showSnackBar(message);
    this.contact_Form.reset();
  }

  private _buildForm(): void {
    this.contact_Form = this._fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required]
    });
  }



}
