import { enableProdMode, importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutes } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { PortService } from './app/services';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(
          BrowserModule, IonicModule.forRoot(),
          RouterModule.forRoot(AppRoutes),
        ),
        StatusBar,
        SplashScreen,
        PortService,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    ]
})
  .catch(err => console.log(err));
