import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  trigger, 
  style, 
  animate, 
  transition,
  keyframes
} from '@angular/animations';

@Component({
  selector: 'app-keyframes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './keyframes.component.html',
  styleUrl: './keyframes.component.scss',
  animations: [
    // Bounce animation using keyframes
    trigger('bounce', [
      transition('* => *', [
        animate('1.5s', keyframes([
          style({ transform: 'translateY(0)', offset: 0 }),
          style({ transform: 'translateY(-50px)', offset: 0.3 }),
          style({ transform: 'translateY(0)', offset: 0.5 }),
          style({ transform: 'translateY(-25px)', offset: 0.7 }),
          style({ transform: 'translateY(0)', offset: 1.0 })
        ]))
      ])
    ]),
    
    // Shake animation using keyframes
    trigger('shake', [
      transition('* => *', [
        animate('0.5s', keyframes([
          style({ transform: 'translateX(0)', offset: 0 }),
          style({ transform: 'translateX(-10px)', offset: 0.1 }),
          style({ transform: 'translateX(10px)', offset: 0.3 }),
          style({ transform: 'translateX(-10px)', offset: 0.5 }),
          style({ transform: 'translateX(10px)', offset: 0.7 }),
          style({ transform: 'translateX(-10px)', offset: 0.9 }),
          style({ transform: 'translateX(0)', offset: 1 })
        ]))
      ])
    ]),
    
    // Pulse animation using keyframes
    trigger('pulse', [
      transition('* => *', [
        animate('1s', keyframes([
          style({ transform: 'scale(1)', opacity: 1, offset: 0 }),
          style({ transform: 'scale(1.1)', opacity: 0.8, offset: 0.3 }),
          style({ transform: 'scale(0.9)', opacity: 0.9, offset: 0.6 }),
          style({ transform: 'scale(1)', opacity: 1, offset: 1 })
        ]))
      ])
    ]),
    
    // Flash animation using keyframes
    trigger('flash', [
      transition('* => *', [
        animate('1s', keyframes([
          style({ opacity: 1, offset: 0 }),
          style({ opacity: 0, offset: 0.25 }),
          style({ opacity: 1, offset: 0.5 }),
          style({ opacity: 0, offset: 0.75 }),
          style({ opacity: 1, offset: 1 })
        ]))
      ])
    ])
  ]
})
export class KeyframesComponent {
  // Control variables to trigger animations
  bounceState = false;
  shakeState = false;
  pulseState = false;
  flashState = false;
  
  // Code examples for the template
  bounceCode = `trigger('bounce', [
  transition('* => *', [
    animate('1.5s', keyframes([
      style({ transform: 'translateY(0)', offset: 0 }),
      style({ transform: 'translateY(-50px)', offset: 0.3 }),
      style({ transform: 'translateY(0)', offset: 0.5 }),
      style({ transform: 'translateY(-25px)', offset: 0.7 }),
      style({ transform: 'translateY(0)', offset: 1.0 })
    ]))
  ])
])`;

  shakeCode = `trigger('shake', [
  transition('* => *', [
    animate('0.5s', keyframes([
      style({ transform: 'translateX(0)', offset: 0 }),
      style({ transform: 'translateX(-10px)', offset: 0.1 }),
      style({ transform: 'translateX(10px)', offset: 0.3 }),
      style({ transform: 'translateX(-10px)', offset: 0.5 }),
      style({ transform: 'translateX(10px)', offset: 0.7 }),
      style({ transform: 'translateX(-10px)', offset: 0.9 }),
      style({ transform: 'translateX(0)', offset: 1 })
    ]))
  ])
])`;

  pulseCode = `trigger('pulse', [
  transition('* => *', [
    animate('1s', keyframes([
      style({ transform: 'scale(1)', opacity: 1, offset: 0 }),
      style({ transform: 'scale(1.1)', opacity: 0.8, offset: 0.3 }),
      style({ transform: 'scale(0.9)', opacity: 0.9, offset: 0.6 }),
      style({ transform: 'scale(1)', opacity: 1, offset: 1 })
    ]))
  ])
])`;

  flashCode = `trigger('flash', [
  transition('* => *', [
    animate('1s', keyframes([
      style({ opacity: 1, offset: 0 }),
      style({ opacity: 0, offset: 0.25 }),
      style({ opacity: 1, offset: 0.5 }),
      style({ opacity: 0, offset: 0.75 }),
      style({ opacity: 1, offset: 1 })
    ]))
  ])
])`;
  
  // Methods to trigger animations
  triggerBounce() {
    this.bounceState = !this.bounceState;
  }
  
  triggerShake() {
    this.shakeState = !this.shakeState;
  }
  
  triggerPulse() {
    this.pulseState = !this.pulseState;
  }
  
  triggerFlash() {
    this.flashState = !this.flashState;
  }
}