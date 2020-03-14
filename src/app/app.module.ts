import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// HttpClient
import { HttpClientModule } from '@angular/common/http';

// AngularFire
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
// import { AngularFireStorageModule } from '@angular/fire/storage';
// import { AngularFirePerformanceModule } from '@angular/fire/performance';

// Enviroment
import { environment } from 'src/environments/environment';

// Services
// import { GeneralService } from './Services/general.service';

// Ng Bootstrap
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Components
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ReservationComponent } from './Components/reservation/reservation.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { InfoComponent } from './Components/info/info.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ReservationComponent,
    NavbarComponent,
    InfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // NgbModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    // AngularFireStorageModule,
    // AngularFirePerformanceModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
