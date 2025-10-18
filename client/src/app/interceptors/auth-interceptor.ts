import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Get the token from localStorage.
  const token = localStorage.getItem('token');

  // 2. If the token exists...
  if (token) {
    // ...clone the request and add the 'Authorization' header.
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    // 3. Pass the new, cloned request to the next handler.
    return next(cloned);
  }

  // If there's no token, just let the original request go through.
  return next(req);
};