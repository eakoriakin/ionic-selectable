import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AppComponent } from './app.component';
import { IonicSelectableModule } from './components/ionic-selectable/ionic-selectable.module';
import { PipesModule } from './pipes';
import { PortService } from './services';

let components = [AppComponent];

@NgModule({
  declarations: components,
  imports: [
    BrowserModule,
    IonicModule.forRoot(AppComponent),
    IonicSelectableModule,
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: components,
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    PortService
  ]
})
export class AppModule { }
