import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatLabel, MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ContactService } from '../contact.service';
import { SnackBarService } from '@shared/services/snack-bar.service';

const MATERIAL_MODULES = [
  MatLabel,
  MatFormField,
  MatInput,
  MatDialogModule,
  MatButtonModule,
  MatOption,
  MatSelectModule,
  CommonModule
];

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [MATERIAL_MODULES, ReactiveFormsModule, NgxMatTimepickerModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  contact_Form!: FormGroup;
  barbers = ['Barbero 1', 'Barbero 2', 'Barbero 3']; // lista de barberos

  private readonly _fb = inject(FormBuilder);
  private readonly _contactSvc = inject(ContactService);
  private readonly _snackBar = inject(SnackBarService);

  ngOnInit(): void {
    this._buildForm();
  }

  async onSubmit() {
    const contact = this.contact_Form.value;
    await this._contactSvc.newContact(contact); // guarda el contacto
    this._snackBar.showSnackBar('Contacto añadido exitosamente'); // muestra el mensaje
    this.contact_Form.reset(); // resetea el formulario
  }

  private _buildForm(): void {
    this.contact_Form = this._fb.group({
      name: ['', Validators.required], // campo de nombre
      barber: ['', Validators.required], // campo de selección de barbero
      hour: ['', Validators.required], // campo de hora
    });
  }
}
