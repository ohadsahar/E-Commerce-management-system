import { ManagmentComponent } from './core/managment/managment.component';
import { HomePageComponent } from './core/homepage/homepage.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule, MatTabsModule, MatFormFieldModule, MatInputModule,
  MatButtonModule, MatCardModule, MatDialogModule, MatDividerModule, MatIconModule,
  MatListModule, MatSnackBarModule, MatExpansionModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { HttpClientModule } from '@angular/common/http';
import { DialogComponent } from './shared/dialogdelete/dialogdelete.component';
import { DialogGeneralPopsComponent } from './shared/dialogeneral/dialogeneral.component';
import { DialogLoginComponent } from './shared/dialoglogin/dialoglogin.component';
import { LogToInComponentDialog } from './shared/dialogtologin/dialogtologin.component';
import { DialogConfirmComponent } from './shared/dialogconfirm/dialogconfirm.component';
import { DialogEditComponent } from './shared/dialogedit/dialogedit.component';
import { OrderDialogComponent } from './shared/dialogorders/dialogorders.component';
import { DialogStatusComponent } from './shared/dialogstatus/dialogstatus.component';



@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ManagmentComponent,
    DialogComponent,
    DialogGeneralPopsComponent,
    DialogLoginComponent,
    LogToInComponentDialog,
    DialogConfirmComponent,
    DialogEditComponent,
    OrderDialogComponent,
    DialogStatusComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTabsModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatCardModule,
    MatDividerModule,
    MatDialogModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule,
    MatExpansionModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  entryComponents: [
    DialogComponent,
    DialogGeneralPopsComponent,
    DialogLoginComponent,
    LogToInComponentDialog,
    DialogConfirmComponent,
    DialogEditComponent,
    OrderDialogComponent,
    DialogStatusComponent



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
