import { Component, ViewChild, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent  {
  name = 'Angular 6';

  constructor(private _dialog: MatDialog) { }

  openStepperDialog(): void {
    let dialogRef = this._dialog.open(SliderDialog, {
      width: '100vw',
      maxWidth: '400px',
      maxHeight: '600px',
      height: '100vh',
      disableClose: true,
      /*position: {
        top: '0',
        left: '0'
      },*/
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
    });
  }
}

const SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' },
  PAN_ACTION = { LEFT: 'panleft', RIGHT: 'panright', END: 'panend' };

@Component({
  templateUrl: './dialog-slider.html',
  styleUrls: [ './dialog.scss' ],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class SliderDialog implements OnInit {
  @ViewChild('slider') slider: ElementRef;
  @ViewChild('slideContainer') slide_container: ElementRef;
  
  slides: Slide[] = [
    {
      img: '',
      title: 'Welcome to coacha',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat odit, ab unde? Similique sint odit voluptates hic dolore omnis repudiandae nesciunt consequatur iste facilis placeat voluptatem, quidem, nobis voluptatum nihil.'
    },
    {
      img: '',
      title: 'Get a personnal trainer near you',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat odit, ab unde? Similique sint odit voluptates hic dolore omnis repudiandae nesciunt consequatur iste facilis placeat voluptatem, quidem, nobis voluptatum nihil.'
    },
    {
      img: '',
      title: 'Share your result',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat odit, ab unde? Similique sint odit voluptates hic dolore omnis repudiandae nesciunt consequatur iste facilis placeat voluptatem, quidem, nobis voluptatum nihil.'
    }
  ];
  selected: number = 0;
  slider_width: number = 0;
  slider_animate: boolean = true;

  constructor(public dialogRef: MatDialogRef<SliderDialog>, private _renderer: Renderer2) { }

  ngOnInit() {
    if (this.slider)
      this.slider_width = this.slider.nativeElement.offsetWidth;
  }

  swipe(evt) {
    console.log(evt);
    // swipe left, next slide
    if (evt.type === SWIPE_ACTION.LEFT && this.selected < this.slides.length - 1) {
        this.selected++;
    }

    // swipe right, previous slide
    if (evt.type === SWIPE_ACTION.RIGHT && this.selected > 0) {
        this.selected--;
    }

  }

  pan(evt) {
    this.slider_animate = false;

    let deltaX: number = evt.deltaX;
    let slide_half: number = this.slider_width / 1.8;
    let x_transform: number = deltaX / (slide_half / 50);
    x_transform = x_transform - (this.selected*100);
    //console.log(deltaX, x_transform, evt.type, evt);

    this._renderer.setStyle(this.slide_container.nativeElement, 'transform', `translateX(${x_transform}%)`);

    if (evt.type == PAN_ACTION.END) {
      this.slider_animate = true;

      let overallVelocityX = Math.abs(evt.overallVelocityX);
      deltaX = evt.overallVelocityX > 1 ? deltaX * overallVelocityX : deltaX;
      // show previous slide, pan to right
      if (deltaX > slide_half && this.selected > 0) {
        this.selected--;
      }

      // show next slide, pan to left
      else if (deltaX < slide_half*-1 && this.selected < this.slides.length - 1) {
        this.selected++;
      }

      // else no slide
      else {
        this._renderer.setStyle(this.slide_container.nativeElement, 'transform', `translateX(-${this.selected*100}%)`);
      }
    }
  }

  onResize(event) {
    if (this.slider)
      this.slider_width = this.slider.nativeElement.offsetWidth;
  }
}

class Slide {
  img: string;
  title: string;
  desc: string;
}