import { Routes } from '@angular/router';
import { ContactFormComponent } from './contact-form/contact-form.component';

const contactsRoute:Routes = [
  {
    path: '',
    loadComponent: () => import('./list/list.component').then(m => m.ListComponent),
  }, { path: '', component: ContactFormComponent }
];

export default contactsRoute;
