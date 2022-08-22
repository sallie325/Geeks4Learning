import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) {}


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        let errorObj: any = {};
        if (error.error instanceof ErrorEvent) {
          errorObj = {
            title: 'Client side error',
            message: `${error.error.message}`
          };
        }
        else {
          errorObj = {
            title: 'Server side error',
            message: `${error.error.message}`
          };
        }

        this.toastr.error(errorObj?.message, errorObj?.title, {
          timeOut: 10000,
        });
        return throwError(errorObj);
      })
    )
  }
}
