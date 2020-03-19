import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { InfoComponent } from './Components/info/info.component';
import { ReservationComponent } from './Components/reservation/reservation.component';
import { AllReservationsComponent } from './Components/all-reservations/all-reservations.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'Dashboard' },
  { path: 'Dashboard', component: DashboardComponent },
  { path: 'Info', component: InfoComponent },
  {
    path: 'Reservation', children: [
      { path: '', component: AllReservationsComponent },
      { path: 'edit/:id', component: ReservationComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
