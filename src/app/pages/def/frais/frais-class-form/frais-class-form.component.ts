import {
    Input
} from '../../../../../../.angular/cache/19.2.27/SchoolManager/vite/deps/@angular_core';
import { Component } from '@angular/core';
import { Frais } from '../frais.component';

@Component({
  selector: 'app-frais-class-form',
  imports: [],
  templateUrl: './frais-class-form.component.html',
  styleUrl: './frais-class-form.component.scss'
})
export class FraisClassFormComponent {

  @Input() ValueIn!: Frais<

}
