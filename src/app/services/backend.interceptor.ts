/*
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";

export const SkipInterceptor = 'X-Skip-Interceptor'; // Header để bỏ qua việc chặn (intercept) request
export const WriteObject = 'X-Write-Object'; // Header để chỉ định việc ghi (write) đối tượng


@Injectable()
export class BackendInterceptor implements HttpInterceptor {

  constructor() { }
  
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  
      // Bỏ qua việc chặn (intercept) nếu header SkipInterceptor tồn tại
      if (request.headers.has(SkipInterceptor)) {
        const headers = request.headers.delete(SkipInterceptor);
        return next.handle(request.clone({ headers }));
      }
  
      // Bỏ qua việc chặn (intercept) nếu header Write-Object tồn tại
      if (request.headers.has(WriteObject)) {
        const headers = request.headers.delete(WriteObject);
        const updatedRequest = request.clone({
          setParams: {
            consumer_key: environment.writableKeys.consumer_key,
            consumer_secret: environment.writableKeys.consumer_secret
          },
          headers
        });
  
        return next.handle(updatedRequest);
      }
  
      // Nếu cả hai header đều không tồn tại, xử lý request bình thường
      const modifiedRequest = request.clone({
        setParams: {
          consumer_key: environment.readOnlyKeys.consumer_key,
          consumer_secret: environment.readOnlyKeys.consumer_secret
        }
      });
  
      return next.handle(modifiedRequest);
    }
    
}
*/
