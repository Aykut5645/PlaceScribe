import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// @ts-ignore
window['initMap'] = () => {
    platformBrowserDynamic().bootstrapModule(AppModule)
        .catch(err => console.error(err));
};

const script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.GOOGLE_API_KEY}&libraries=visualization&callback=initMap`;
script.defer = true;
script.async = true;
document.head.appendChild(script);
