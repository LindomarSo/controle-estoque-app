import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTabsModule } from "@angular/material/tabs";
import { VoluntaryRoutingModule } from "./voluntary.routing.module";
import { ListVoluntaryComponent } from "./list-voluntary/list-voluntary.component";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatDialogModule } from "@angular/material/dialog";
import { MatStepperModule } from "@angular/material/stepper";
import { MatPaginatorModule } from "@angular/material/paginator";
import { CreateVoluntaryComponent } from "./create-voluntary/create-voluntary.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { VoluntaryComponent } from "./voluntary.component";
import { ListPartnerComponent } from "./list-partner/list-partner.component";
import { DoacoesModule } from "../doacoes/doacoes.module";
import { MatNativeDateModule } from "@angular/material/core";
import { VoluntaryDetailComponent } from "./voluntary-detail/voluntary-detail.component";
import { UtilsModule } from "src/app/utils/utils.module";
import { MatRadioModule } from "@angular/material/radio";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { CoreModule } from "src/app/core/core.module";
import { MatMenuModule } from "@angular/material/menu";
import { PipesModule } from "src/app/utils/pipes/pipes.module";
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask'

@NgModule({
  declarations: [
    ListVoluntaryComponent,
    CreateVoluntaryComponent,
    VoluntaryComponent,
    ListPartnerComponent,
    VoluntaryDetailComponent,
  ],
  imports: [
    CommonModule,
    VoluntaryRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatDividerModule,
    MatSelectModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatStepperModule,
    MatTabsModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatCardModule,
    MatDatepickerModule,
    MatMenuModule,
    DoacoesModule,
    FormsModule,
    UtilsModule,
    PipesModule,
    ReactiveFormsModule,
    CoreModule,
    NgxMaskDirective
  ],
  exports: [ListVoluntaryComponent, CreateVoluntaryComponent],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: "outline",
        floatLabel: "always",
      },
    },
    provideNgxMask()
  ],
})
export class VoluntaryModule {}
