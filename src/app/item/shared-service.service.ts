import {Injectable, EventEmitter, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  itemReflected = new EventEmitter();
}
