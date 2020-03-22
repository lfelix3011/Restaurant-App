import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { InfoComponent } from './Components/info/info.component';
import { ReservationComponent } from './Components/reservation/reservation.component';
import { AllReservationsComponent } from './Components/all-reservations/all-reservations.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { UserComponent } from './Components/user/user.component';
import { UserEditComponent } from './Components/user/user-edit/user-edit.component';


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
  { path: 'Register', component: RegisterComponent },
  { path: 'Login', component: LoginComponent },
  {
    path: 'User', children: [
      { path: '', component: UserComponent },
      { path: 'edit', component: UserEditComponent },
      // { path: 'edit/:id', component: UserEditComponent },
    ]
  },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
