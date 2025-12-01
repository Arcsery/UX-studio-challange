import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [
    NgClass,
    NgIf
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'special' | 'ghost' = 'primary';

  @Input() iconOnly = false;

  @Input() showIcon = false;

  @Input() type: 'button' | 'submit' = 'button';
}
