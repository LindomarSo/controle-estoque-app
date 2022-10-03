// Angular Modules
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome.component';

// Custom Modules

@NgModule({
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent],
  imports: [MatButtonModule, WelcomeRoutingModule],
})
export class WelcomeModule {}
