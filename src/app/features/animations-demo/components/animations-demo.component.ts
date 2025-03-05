import { Component, AfterContentInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';

import { BasicAnimationsComponent } from './basic-animations/basic-animations.component';
import { AdvancedAnimationsComponent } from './advanced-animations/advanced-animations.component';
import { TransitionsComponent } from './transitions/transitions.component';
import { KeyframesComponent } from './keyframes/keyframes.component';
import { StaggerComponent } from './stagger/stagger.component';

@Component({
  selector: 'app-animations-demo',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    BasicAnimationsComponent,
    AdvancedAnimationsComponent,
    TransitionsComponent,
    KeyframesComponent,
    StaggerComponent
  ],
  templateUrl: './animations-demo.component.html',
  styleUrl: './animations-demo.component.scss'
})
export class AnimationsDemoComponent implements AfterContentInit, OnDestroy {
  sections = [
    { id: 'basic', title: 'Basic Animations', description: 'Simple property and state animations' },
    { id: 'transitions', title: 'Transitions', description: 'Animations between states' },
    { id: 'advanced', title: 'Advanced Animations', description: 'Complex multi-element animations' },
    { id: 'keyframes', title: 'Keyframes', description: 'Multi-step timed animations' },
    { id: 'stagger', title: 'Staggered Animations', description: 'Animations with delayed sequence' }
  ];
  
  isRouterOutletActive = false;
  private routerSubscription?: Subscription;
  
  // Code examples for the template
  importCode = `import { animate, state, style, transition, trigger } from '@angular/animations';`;
  
  basicAnimationCode = `@Component({
  // ... other metadata
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '200px',
        opacity: 1,
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.5,
      })),
      transition('open => closed', [
        animate('0.3s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
})`;

  transitionCode = `// Simple transition between named states
transition('inactive => active', animate('100ms ease-in'))

// Bidirectional transition between states
transition('inactive <=> active', animate('200ms ease-out'))

// Wildcard state (any state)
transition('* => active', animate('300ms ease-in'))

// Void state (element entering/leaving the DOM)
transition('void => *', [
  style({ opacity: 0, transform: 'translateY(-20px)' }),
  animate('300ms ease-out')
])

// Exit animation
transition('* => void', [
  animate('300ms ease-in', 
    style({ opacity: 0, transform: 'translateY(20px)' })
  )
])`;

  groupCode = `transition('* => active', [
  group([  // Run animations in parallel
    animate('200ms ease-in', style({ color: 'blue' })),
    animate('400ms ease-out', style({ fontSize: '24px' }))
  ])
])`;

  sequenceCode = `transition('* => active', [
  sequence([  // Run animations one after another
    animate('200ms', style({ opacity: 1 })),
    animate('300ms', style({ transform: 'translateX(100px)' })),
    animate('400ms', style({ backgroundColor: 'red' }))
  ])
])`;

  keyframeCode = `transition('* => active', [
  animate('1.5s', keyframes([
    style({ offset: 0, transform: 'scale(1)', opacity: 1 }),
    style({ offset: 0.3, transform: 'scale(1.3)', opacity: 0.7 }),
    style({ offset: 0.6, transform: 'scale(0.8)', opacity: 0.8 }),
    style({ offset: 1, transform: 'scale(1)', opacity: 1 })
  ]))
])`;

  staggerCode = `trigger('listAnimation', [
  transition('* => *', [ // Each time the list changes
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(-20px)' }),
      stagger('50ms',
        animate('500ms ease-out', 
          style({ opacity: 1, transform: 'translateY(0)' })
        )
      )
    ], { optional: true }),
    query(':leave', [
      stagger('30ms',
        animate('300ms ease-in',
          style({ opacity: 0, transform: 'translateY(20px)' })
        )
      )
    ], { optional: true })
  ])
])`;
  
  constructor(private router: Router) {}
  
  ngAfterContentInit(): void {
    // Check initial route
    const url = this.router.url;
    this.isRouterOutletActive = url.includes('/animations-demo/');
    
    // Subscribe to route changes
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.isRouterOutletActive = event.url.includes('/animations-demo/');
      });
  }
  
  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}