import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';

const enter = [
  style({ opacity: '0' }),
  animate('50ms ease-out', style({ position: 'absolute', opacity: '1' })),
];
const leave = [
  style({ opacity: '1' }),
  animate('50ms ease-out', style({ opacity: '0' })),
];

export const CamerasAnimation = trigger('slide', [
  transition(':enter', enter),
  transition(':leave', leave),
]);
