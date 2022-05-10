import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { DialogAddOrEditInfraestructureComponent } from './singleton/dialog-add-or-edit-infraestructure/dialog-add-or-edit-infraestructure.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { DialogResponseComponent } from './singleton/dialog-response/dialog-response.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { DialogAddOrEditPersonalComponent } from './singleton/dialog-add-or-edit-personal/dialog-add-or-edit-personal.component';
import { DialogAddMarcaComponent } from './singleton/dialog-add-marca/dialog-add-marca.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogConfirmComponent } from './singleton/dialog-confirm/dialog-confirm.component';
import { DialogAddAreaComponent } from './singleton/dialog-add-area/dialog-add-area.component';
import { DialogAddModeloComponent } from './singleton/dialog-add-modelo/dialog-add-modelo.component';
import { DialogAddCategoriaComponent } from './singleton/dialog-add-categoria/dialog-add-categoria.component';
import { DialogAddUserComponent } from './singleton/dialog-add-user/dialog-add-user.component';
import { DialogEditPasswordComponent } from './singleton/dialog-edit-password/dialog-edit-password.component';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DialogAddOrEditInfraestructureComponent,
    RecoverPasswordComponent,
    DialogResponseComponent,
    DialogAddOrEditPersonalComponent,
    DialogAddMarcaComponent,
    DialogConfirmComponent,
    DialogAddAreaComponent,
    DialogAddModeloComponent,
    DialogAddCategoriaComponent,
    DialogAddUserComponent,
    DialogEditPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    LottieModule.forRoot({ player: playerFactory })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
