import { NgModule } from '@angular/core';
import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MatStepperModule, MatDialogModule, MatIconModule, MatButtonModule } from '@angular/material';

import { AppComponent, SliderDialog } from './app.component';
import { HelloComponent } from './hello.component';

export class MyHammerConfig extends HammerGestureConfig  {
  overrides = <any>{
      pan: { direction: Hammer.DIRECTION_HORIZONTAL },
      swipe: { direction: Hammer.DIRECTION_HORIZONTAL, velocity: 0.4, threshold: 20 },
  }
}

@NgModule({
  imports:      [ 
    BrowserModule, BrowserAnimationsModule, FormsModule,
    MatStepperModule, MatDialogModule, MatIconModule, MatButtonModule
  ],
  declarations: [ AppComponent, HelloComponent, SliderDialog ],
  entryComponents: [ SliderDialog ],
  providers: [
    { 
      provide: HAMMER_GESTURE_CONFIG, 
      useClass: MyHammerConfig 
    }
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
