import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NetworkService } from './services/network.service';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        IonicModule.forRoot(),
        HttpClientModule,
        FormsModule,
        AppRoutingModule,
        RouterModule.forRoot([])],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        NetworkService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}