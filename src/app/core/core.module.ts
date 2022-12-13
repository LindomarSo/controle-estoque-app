// Angular Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Custom Modules
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoadingContainerComponent } from './components/loading-container/loading-container.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { HeaderNavComponent } from './components/header-nav/header-nav.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    HeaderNavComponent,
    LoadingContainerComponent,
    NotFoundComponent,
    SideMenuComponent,
    SideNavComponent,
  ],
  exports: [
    HeaderNavComponent,
    LoadingContainerComponent,
    NotFoundComponent,
    SideMenuComponent,
    SideNavComponent,
  ],
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule],
})
export class CoreModule { }
