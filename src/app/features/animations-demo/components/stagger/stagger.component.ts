import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger,
} from '@angular/animations';

@Component({
  selector: 'app-stagger',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stagger.component.html',
  styleUrl: './stagger.component.scss',
  animations: [
    // List item stagger animation
    trigger('listAnimation', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-15px)' }),
            stagger('60ms', [
              animate(
                '300ms ease-out',
                style({ opacity: 1, transform: 'translateY(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
        query(
          ':leave',
          [
            stagger('40ms', [
              animate(
                '200ms ease-in',
                style({ opacity: 0, transform: 'translateY(15px)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),

    // Grid item stagger animation
    trigger('gridAnimation', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'scale(0.8)' }),
            stagger('100ms', [
              animate(
                '400ms ease-out',
                style({ opacity: 1, transform: 'scale(1)' })
              ),
            ]),
          ],
          { optional: true }
        ),
        query(
          ':leave',
          [
            stagger('100ms', [
              animate(
                '300ms ease-in',
                style({ opacity: 0, transform: 'scale(0.8)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),

    // Ripple stagger animation
    trigger('rippleAnimation', [
      transition('* => *', [
        query(
          '.ripple-item',
          [
            style({ opacity: 0, transform: 'scale(0)' }),
            stagger('150ms', [
              animate(
                '500ms cubic-bezier(0.4, 0.0, 0.2, 1)',
                style({ opacity: 1, transform: 'scale(1)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class StaggerComponent {
  rippleAnimation: string = `trigger('rippleAnimation', [
  transition('* => *', [
    query('.ripple-item', [
      style({ opacity: 0, transform: 'scale(0)' }),
      stagger('150ms', [
        animate('500ms cubic-bezier(0.4, 0.0, 0.2, 1)', 
          style({ opacity: 1, transform: 'scale(1)' })
        )
      ])
    ], { optional: true })
  ])
])`;
  gridAnimation: string = `trigger('gridAnimation', [
  transition('* => *', [
    query(':enter', [
      style({ opacity: 0, transform: 'scale(0.8)' }),
      stagger('100ms', [
        animate('400ms ease-out', 
          style({ opacity: 1, transform: 'scale(1)' })
        )
      ])
    ], { optional: true }),
    query(':leave', [
      stagger('100ms', [
        animate('300ms ease-in', 
          style({ opacity: 0, transform: 'scale(0.8)' })
        )
      ])
    ], { optional: true })
  ])
])`;
  listAnimation: string = `trigger('listAnimation', [
  transition('* => *', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(-15px)' }),
      stagger('60ms', [
        animate('300ms ease-out', 
          style({ opacity: 1, transform: 'translateY(0)' })
        )
      ])
    ], { optional: true }),
    query(':leave', [
      stagger('40ms', [
        animate('200ms ease-in', 
          style({ opacity: 0, transform: 'translateY(15px)' })
        )
      ])
    ], { optional: true })
  ])
])`;
  // List items
  listItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

  // Grid items
  gridItems = Array.from({ length: 9 }, (_, i) => i + 1);

  // Number of ripples
  rippleCount = 5;
  rippleItems: number[] = [];

  constructor() {
    this.updateRippleItems();
  }

  // Add or remove items for the list animation
  addListItem() {
    this.listItems.push(`Item ${this.listItems.length + 1}`);
  }

  removeListItem() {
    if (this.listItems.length > 0) {
      this.listItems.pop();
    }
  }

  // Toggle grid items for the grid animation
  toggleGridItems() {
    if (this.gridItems.length > 0) {
      this.gridItems = [];
    } else {
      this.gridItems = Array.from({ length: 9 }, (_, i) => i + 1);
    }
  }

  // Trigger the ripple animation
  triggerRipple() {
    // Update the array to trigger the animation
    this.updateRippleItems();
  }

  private updateRippleItems() {
    // Create a new array to trigger the animation
    this.rippleItems = Array.from({ length: this.rippleCount }, (_, i) => i);
  }
}
