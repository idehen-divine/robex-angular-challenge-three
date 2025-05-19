import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;

    if (this.isMobileMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }

  ngOnInit(): void {
    this.checkViewport();
  }

  // Listen to window resize events
  @HostListener('window:resize', [])
  onWindowResize() {
    this.checkViewport();
  }

  private checkViewport() {
    if (window.innerWidth > 600) {
      this.isMobileMenuOpen = false;
      document.body.classList.remove('no-scroll');
    }
  }
}
