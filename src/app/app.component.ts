import { Component } from '@angular/core';
import { trigger, state, style, animate, transition, sequence } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [trigger('fadeIn', [
    transition(':enter', [
      style({opacity: 0 ,transform: 'translateY(100%)'}),
      animate(500, style({ opacity: 1 ,transform: 'translateY(0)'}))
    ]),
    transition(':leave', [
      style({ opacity: 1,transform: 'translateY(0)' }),
      animate(500, style({ opacity: 0,transform: 'translateY(-100%)' }))
    ])
  ])]
})

export class AppComponent {
  activateFadeIn:boolean = false;
  activateFadeInOverlay:boolean = false ;
  fadeInText:string = '';

  showFeedback(message:string) {
    this.activateFadeInOverlay =  true ;
    this.activateFadeIn =  true ;
    this.fadeInText = message ;
  }

  removeOverlay(){
    setTimeout(() => {
      this.activateFadeInOverlay = false ;
    }, 2000);
    setTimeout(() => {
      this.activateFadeIn = false ;
    }, 1000);
  }

}
