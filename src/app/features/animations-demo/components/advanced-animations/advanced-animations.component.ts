import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  group,
  query,
  animateChild,
} from '@angular/animations';

@Component({
  selector: 'app-advanced-animations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './advanced-animations.component.html',
  styleUrl: './advanced-animations.component.scss',
  animations: [
    // Parent container animation with animateChild
    trigger('parentAnimation', [
      transition(':enter', [
        style({ backgroundColor: '#f5f5f5' }),
        animate('300ms', style({ backgroundColor: '#e3f2fd' })),
        query('@childAnimation', animateChild()),
      ]),
      transition(':leave', [
        group([
          animate('300ms', style({ transform: 'scale(0.9)', opacity: 0 })),
          query('@childAnimation', animateChild()),
        ]),
      ]),
    ]),

    // Child animation
    trigger('childAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(50px)', opacity: 0 }),
        animate(
          '300ms 100ms ease-out',
          style({ transform: 'translateY(0)', opacity: 1 })
        ),
      ]),
      transition(':leave', [
        animate(
          '200ms ease-in',
          style({ transform: 'translateY(50px)', opacity: 0 })
        ),
      ]),
    ]),

    // Parallel animation using group
    trigger('parallelAnimation', [
      state(
        'initial',
        style({
          backgroundColor: '#f5f5f5',
          transform: 'scale(1)',
          borderRadius: '4px',
        })
      ),
      state(
        'final',
        style({
          backgroundColor: '#673ab7',
          transform: 'scale(1.1)',
          borderRadius: '50%',
        })
      ),
      transition('initial => final', [
        group([
          animate('500ms ease-out', style({ backgroundColor: '#673ab7' })),
          animate('800ms ease-in-out', style({ transform: 'scale(1.1)' })),
          animate(
            '1200ms cubic-bezier(0.4, 0.0, 0.2, 1)',
            style({ borderRadius: '50%' })
          ),
        ]),
      ]),
      transition('final => initial', [
        group([
          animate('500ms', style({ backgroundColor: '#f5f5f5' })),
          animate('800ms', style({ transform: 'scale(1)' })),
          animate('1200ms', style({ borderRadius: '4px' })),
        ]),
      ]),
    ]),

    // Complex sequence animation
    trigger('sequenceAnimation', [
      transition('* => start', [
        style({ transform: 'translateX(0)' }),
        animate('600ms ease-in', style({ transform: 'translateX(100px)' })),
        animate('300ms ease-out', style({ transform: 'translateX(0)' })),
        animate('300ms ease-in', style({ transform: 'translateY(50px)' })),
        animate('300ms ease-out', style({ transform: 'translateY(0)' })),
        animate('500ms ease-in-out', style({ transform: 'rotate(360deg)' })),
      ]),
    ]),
  ],
})
export class AdvancedAnimationsComponent {
  animation: string = `rigger('parallelAnimation', [
  state('initial', style({
    backgroundColor: '#f5f5f5',
    transform: 'scale(1)',
    borderRadius: '4px'
  })),
  state('final', style({
    backgroundColor: '#673ab7',
    transform: 'scale(1.1)',
    borderRadius: '50%'
  })),
  transition('initial => final', [
    group([
      animate('500ms ease-out', style({ backgroundColor: '#673ab7' })),
      animate('800ms ease-in-out', style({ transform: 'scale(1.1)' })),
      animate('1200ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({ borderRadius: '50%' }))
    ])
  ])
])`;

  sequenceAnimation: string = `trigger('sequenceAnimation', [
  transition('* => start', [
    style({ transform: 'translateX(0)' }),
    animate('600ms ease-in', style({ transform: 'translateX(100px)' })),
    animate('300ms ease-out', style({ transform: 'translateX(0)' })),
    animate('300ms ease-in', style({ transform: 'translateY(50px)' })),
    animate('300ms ease-out', style({ transform: 'translateY(0)' })),
    animate('500ms ease-in-out', style({ transform: 'rotate(360deg)' }))
  ])
])`;
  parentAnimation: string = `// Parent container animation
trigger('parentAnimation', [
  transition(':enter', [
    style({ backgroundColor: '#f5f5f5' }),
    animate('300ms', style({ backgroundColor: '#e3f2fd' })),
    query('@childAnimation', animateChild())
  ]),
  transition(':leave', [
    group([
      animate('300ms', style({ transform: 'scale(0.9)', opacity: 0 })),
      query('@childAnimation', animateChild())
    ])
  ])
]),

// Child animation
trigger('childAnimation', [
  transition(':enter', [
    style({ transform: 'translateY(50px)', opacity: 0 }),
    animate('300ms 100ms ease-out', 
      style({ transform: 'translateY(0)', opacity: 1 })
    )
  ]),
  transition(':leave', [
    animate('200ms ease-in', 
      style({ transform: 'translateY(50px)', opacity: 0 })
    )
  ])
])`;
  // Control variables
  showParent = true;
  parallelState = 'initial';
  sequenceState = 'idle';

  // Toggle methods
  toggleParent() {
    this.showParent = !this.showParent;
  }

  toggleParallelAnimation() {
    this.parallelState = this.parallelState === 'initial' ? 'final' : 'initial';
  }

  startSequenceAnimation() {
    this.sequenceState = 'idle';
    setTimeout(() => {
      this.sequenceState = 'start';
    }, 100);
  }
}
