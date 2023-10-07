import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateVoluntaryComponent } from "./create-voluntary/create-voluntary.component";
import { VoluntaryDetailComponent } from "./voluntary-detail/voluntary-detail.component";
import { VoluntaryComponent } from "./voluntary.component";
import { ListVoluntaryComponent } from "./list-voluntary/list-voluntary.component";
import { ListPartnerComponent } from "./list-partner/list-partner.component";

const routes: Routes = [
  {
    path: "",
    component: VoluntaryComponent,
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "pessoa-fisica"
      },
      {
        path: "pessoa-fisica",
        component: ListVoluntaryComponent,
      },
      {
        path: "pessoa-juridica",
        component: ListPartnerComponent,
      },
      {
        path: "pessoa-juridica/criar-voluntario/:pessoa",
        component: CreateVoluntaryComponent,
      },
      {
        path: "pessoa-fisica/criar-voluntario/:pessoa",
        component: CreateVoluntaryComponent,
      },
      {
        path: "pessoa-fisica/detalhe/:id",
        component: VoluntaryDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoluntaryRoutingModule {}
