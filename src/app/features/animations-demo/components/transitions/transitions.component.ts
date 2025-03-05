import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-transitions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transitions.component.html',
  styleUrl: './transitions.component.scss',
  animations: [
    // Enter/Leave Transitions with Void State
    trigger('enterLeave', [
      // Enter transition (void => *)
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate(
          '300ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      // Leave transition (* => void)
      transition(':leave', [
        animate(
          '300ms ease-in',
          style({ opacity: 0, transform: 'translateY(20px)' })
        ),
      ]),
    ]),

    // Multi-state transitions
    trigger('trafficLight', [
      state(
        'red',
        style({
          backgroundColor: '#f44336',
          transform: 'scale(1.2)',
          boxShadow: '0 0 20px rgba(244, 67, 54, 0.5)',
        })
      ),
      state(
        'yellow',
        style({
          backgroundColor: '#ffc107',
          transform: 'scale(1.1)',
          boxShadow: '0 0 20px rgba(255, 193, 7, 0.5)',
        })
      ),
      state(
        'green',
        style({
          backgroundColor: '#4caf50',
          transform: 'scale(1)',
          boxShadow: '0 0 20px rgba(76, 175, 80, 0.5)',
        })
      ),

      // Different timing for each state transition
      transition('red => yellow', [animate('1s ease-in')]),
      transition('yellow => green', [animate('1s ease-out')]),
      transition('green => red', [animate('0.5s')]),
    ]),

    // Wildcard state transitions
    trigger('wildcard', [
      state(
        'initial',
        style({
          backgroundColor: '#e0e0e0',
          transform: 'scale(1)',
        })
      ),
      state(
        'final',
        style({
          backgroundColor: '#3f51b5',
          transform: 'scale(1.1)',
        })
      ),

      // Wildcard to specific (any state to final)
      transition('* => final', [
        animate(
          '0.5s ease-in',
          style({ backgroundColor: '#3f51b5', transform: 'scale(1.1)' })
        ),
      ]),

      // Specific to wildcard (initial to any state)
      transition('initial => *', [animate('0.8s ease-out')]),

      // Wildcard to wildcard (any state to any state)
      transition('* => *', [animate('0.3s')]),
    ]),
  ],
})
export class TransitionsComponent {
  traficAnimation: string = `trigger('trafficLight', [
  state('red', style({
    backgroundColor: '#f44336',
    transform: 'scale(1.2)',
    boxShadow: '0 0 20px rgba(244, 67, 54, 0.5)'
  })),
  state('yellow', style({
    backgroundColor: '#ffc107',
    transform: 'scale(1.1)',
    boxShadow: '0 0 20px rgba(255, 193, 7, 0.5)'
  })),
  state('green', style({
    backgroundColor: '#4caf50',
    transform: 'scale(1)',
    boxShadow: '0 0 20px rgba(76, 175, 80, 0.5)'
  })),
  
  // Different timing for each state transition
  transition('red => yellow', [
    animate('1s ease-in')
  ]),
  transition('yellow => green', [
    animate('1s ease-out')
  ]),
  transition('green => red', [
    animate('0.5s')
  ])
])`;
  enterLeaveAnimation: string = `trigger('enterLeave', [
  // Enter transition (void => *)
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(-20px)' }),
    animate('300ms ease-out', 
      style({ opacity: 1, transform: 'translateY(0)' })
    )
  ]),
  // Leave transition (* => void)
  transition(':leave', [
    animate('300ms ease-in', 
      style({ opacity: 0, transform: 'translateY(20px)' })
    )
  ])
])`;
  wildAnimation: string = `trigger('wildcard', [
  state('initial', style({
    backgroundColor: '#e0e0e0',
    transform: 'scale(1)'
  })),
  state('final', style({
    backgroundColor: '#3f51b5',
    transform: 'scale(1.1)'
  })),
  
  // Wildcard to specific (any state to final)
  transition('* => final', [
    animate('0.5s ease-in')
  ]),
  
  // Specific to wildcard (initial to any state)
  transition('initial => *', [
    animate('0.8s ease-out')
  ]),
  
  // Wildcard to wildcard (any state to any state)
  transition('* => *', [
    animate('0.3s')
  ])
])`;
  // Control variables
  showElement = true;
  trafficLightState = 'red';
  wildcardState = 'initial';

  // Toggle element visibility
  toggleElement() {
    this.showElement = !this.showElement;
  }

  // Change traffic light state
  changeTrafficLight() {
    // Cycle through states: red -> yellow -> green -> red
    if (this.trafficLightState === 'red') {
      this.trafficLightState = 'yellow';
    } else if (this.trafficLightState === 'yellow') {
      this.trafficLightState = 'green';
    } else {
      this.trafficLightState = 'red';
    }
  }

  // Toggle wildcard state
  toggleWildcardState() {
    if (this.wildcardState === 'initial') {
      this.wildcardState = 'final';
    } else if (this.wildcardState === 'final') {
      this.wildcardState = 'intermediate'; // Not defined state
    } else {
      this.wildcardState = 'initial';
    }
  }
}
