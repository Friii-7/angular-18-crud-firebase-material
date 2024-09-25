import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule],
  template: `
    <nav class="navbar">
      <div class="container">
        <div class="navbar-header">
          <a class="brand">
            <h4>BarberShop&nbsp;<span>Araz</span></h4>
          </a>
        </div>
        <div class="navbar-actions">
          <button mat-button (click)="emitClick()">
            <mat-icon>add_box</mat-icon>
            <span>Agendar Cita</span>
          </button>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #3f51b5;
      padding: 10px 20px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: background-color 0.3s ease-in-out;
    }

    .navbar:hover {
      background-color: #303f9f;
    }

    .navbar-header .brand h4 {
      margin: 0;
      color: white;
      font-family: 'Poppins', sans-serif;
      font-weight: 700;
    }

    .navbar-header .brand h4 span {
      color: #ffca28;
    }

    .navbar-nav {
      list-style: none;
      display: flex;
      gap: 25px;
    }

    .navbar-nav li a {
      color: white;
      text-decoration: none;
      font-family: 'Roboto', sans-serif;
      font-weight: 500;
      transition: color 0.3s ease-in-out;
    }

    .navbar-nav li a:hover {
      color: #ffca28;
    }

    .navbar-nav li a.active {
      border-bottom: 2px solid #ffca28;
    }

    .navbar-actions {
      display: flex;
      align-items: center;
    }

    .navbar-actions button {
      background-color: #ffca28;
      color: #3f51b5;
      font-weight: 600;
      border-radius: 20px;
      transition: transform 0.3s ease-in-out;
    }

    .navbar-actions button:hover {
      transform: scale(1.05);
      background-color: #ffb300;
    }

    .navbar-actions mat-icon {
      margin-right: 8px;
    }

    /* Mobile responsiveness */
    @media (max-width: 768px) {
      .navbar {
        flex-direction: column;
        padding: 20px;
      }

      .navbar-nav {
        flex-direction: column;
        gap: 15px;
        margin-top: 10px;
      }

      .navbar-actions {
        margin-top: 15px;
      }
    }
  `],
})
export class NavbarComponent {
  @Output() onNewContactEvent = new EventEmitter<void>();

  emitClick(): void {
    this.onNewContactEvent.emit();
  }
}
