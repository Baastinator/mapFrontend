import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Pipe({
  name: 'secure',
  standalone: true,
})
export class SecurePipe implements PipeTransform {
  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
  ) {}

  transform(url: string): Observable<SafeUrl> {
    return this.http
      .get(url, { responseType: 'blob' })
      .pipe(
        map((val) =>
          this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(val)),
        ),
      );
  }
}
