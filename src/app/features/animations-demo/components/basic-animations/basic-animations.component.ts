import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  trigger, 
  state, 
  style, 
  animate, 
  transition 
} from '@angular/animations';

@Component({
  selector: 'app-basic-animations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './basic-animations.component.html',
  styleUrl: './basic-animations.component.scss',
  animations: [
    // Simple toggle animation
    trigger('openClose', [
      // Define "open" state
      state('open', style({
        height: '200px',
        backgroundColor: '#3f51b5',
        color: 'white',
        borderRadius: '8px',
        padding: '20px'
      })),
      // Define "closed" state
      state('closed', style({
        height: '100px',
        backgroundColor: '#f5f5f5',
        color: '#333',
        borderRadius: '8px',
        padding: '20px'
      })),
      // Transition from open to closed
      transition('open => closed', [
        animate('0.3s ease-in')
      ]),
      // Transition from closed to open
      transition('closed => open', [
        animate('0.5s ease-out')
      ])
    ]),
    
    // Fade in/out animation
    trigger('fade', [
      state('visible', style({
        opacity: 1
      })),
      state('invisible', style({
        opacity: 0
      })),
      transition('visible => invisible', [
        animate('0.5s')
      ]),
      transition('invisible => visible', [
        animate('0.5s')
      ])
    ]),
    
    // Scale animation
    trigger('scale', [
      state('normal', style({
        transform: 'scale(1)'
      })),
      state('enlarged', style({
        transform: 'scale(1.2)'
      })),
      transition('normal <=> enlarged', [
        animate('0.3s ease-in-out')
      ])
    ])
  ]
})
export class BasicAnimationsComponent {
  // State variables
  isOpen = true;
  isVisible = true;
  isEnlarged = false;
  
  // Code examples for the template
  openCloseCode = `trigger('openClose', [
  state('open', style({
    height: '200px',
    backgroundColor: '#3f51b5',
    color: 'white'
  })),
  state('closed', style({
    height: '100px',
    backgroundColor: '#f5f5f5',
    color: '#333'
  })),
  transition('open => closed', [
    animate('0.3s ease-in')
  ]),
  transition('closed => open', [
    animate('0.5s ease-out')
  ])
])`;

  fadeCode = `trigger('fade', [
  state('visible', style({
    opacity: 1
  })),
  state('invisible', style({
    opacity: 0
  })),
  transition('visible => invisible', [
    animate('0.5s')
  ]),
  transition('invisible => visible', [
    animate('0.5s')
  ])
])`;

  scaleCode = `trigger('scale', [
  state('normal', style({
    transform: 'scale(1)'
  })),
  state('enlarged', style({
    transform: 'scale(1.2)'
  })),
  transition('normal <=> enlarged', [
    animate('0.3s ease-in-out')
  ])
])`;
  
  // Toggle methods
  toggle() {
    this.isOpen = !this.isOpen;
  }
  
  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }
  
  toggleSize() {
    this.isEnlarged = !this.isEnlarged;
  }
}