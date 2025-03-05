import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpDemoRoutingModule } from './http-demo-routing.module';
import { HttpBasicsComponent } from './components/http-basics/http-basics.component';
import { HttpAdvancedComponent } from './components/http-advanced/http-advanced.component';

// Services
import { BasicHttpService } from './services/basic-http.service';
import { AdvancedHttpService } from './services/advanced-http.service';
import { LoaderService } from './services/loader.service';
import { ErrorHandlerService } from './services/error-handler.service';
import { CacheService } from './services/cache.service';

// Interceptors
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { CacheInterceptor } from './interceptors/cache.interceptor';
import { LoaderInterceptor } from './interceptors/loader.interceptor';

@NgModule({
  declarations: [
    // Standalone components should not be declared in NgModule
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpDemoRoutingModule,
    // Import standalone components instead
    HttpBasicsComponent,
    HttpAdvancedComponent,
  ],
  providers: [
    BasicHttpService,
    AdvancedHttpService,
    LoaderService,
    ErrorHandlerService,
    CacheService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
})
export class HttpDemoModule {}
