import { Routes } from '@angular/router';


// Define the application routes
export const routes: Routes = [
  {
    path: 'contacts',
    loadChildren: () => import('./features/contacts/contacts.routes') // Lazy load contacts routes
  },

  {
    path: '', // Default route
    redirectTo: '/contacts', // Redirect to contacts
    pathMatch: 'full', // Ensure full path match
  },
  {
    path: '**', // Wildcard route for a 404 page
    redirectTo: '/contacts', // Redirect to contacts for unknown routes
  },
];
