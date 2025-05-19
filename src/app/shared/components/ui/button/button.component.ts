import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NgClass } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-button',
  template: `
    <button
      mat-button
      [ngClass]="classes"
      [disabled]="disabled"
      [type]="type"
    >
      <ng-content></ng-content>
    </button>
  `,
  imports: [MatButtonModule, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Input() variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' = 'default';
  @Input() size:    'default' | 'sm' | 'lg' | 'icon' = 'default';
  @Input() type:    'button' | 'submit' = 'button';
  @Input() disabled = false;

  get classes(): string {
    const base =
      'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ' +
      'ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 ' +
      'focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

    const variants: Record<string, string> = {
      default:      'bg-primary text-primary-foreground hover:bg-primary/90',
      destructive:  'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      outline:      'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      secondary:    'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      ghost:        'hover:bg-accent hover:text-accent-foreground',
      link:         'text-primary underline-offset-4 hover:underline'
    };

    const sizes: Record<string, string> = {
      default: 'h-10 px-4 py-2',
      sm:      'h-9 rounded-md px-3',
      lg:      'h-11 rounded-md px-8',
      icon:    'h-10 w-10'
    };

    return `${base} ${variants[this.variant]} ${sizes[this.size]} [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0`;
  }
}
