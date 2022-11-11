import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { TextInputComponent } from './common/text-input/text-input.component';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { MinusSignPipe } from './pipe/MinusSignPipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TextInputComponent,
    MinusSignPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CurrencyMaskModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
