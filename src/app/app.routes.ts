import { Routes } from '@angular/router';
import { ContactFormComponent } from '@features/contacts/contact-form/contact-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/contacts', pathMatch: 'full' },
  { path: 'contacts', loadChildren: () => import('./features/contacts/contacts.routes') },
  { path: 'contact-form', component: ContactFormComponent },  // Nueva ruta para el formulario
  { path: '**', redirectTo: '/contacts' }
];
