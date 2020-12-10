import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {
  returndObj: any;

  validation(validatorObj, validatedObj): any {
    const isNotEmpty = /\S+/;
    const isEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    for (const [key, value] of Object.entries(validatedObj)) {
      if (validatorObj.hasOwnProperty(key)) {
        if (!validatedObj[key] || validatedObj[key] == null || typeof  validatedObj[key] === 'undefined') {
          validatorObj[key] = true;
        } else {
          if (key === 'email') {
            validatorObj[key] = !isNotEmpty.test(validatedObj[key]) || !isEmail.test(validatedObj[key]);
            console.log(!isNotEmpty.test(validatedObj[key]), !isEmail.test(validatedObj[key]));
          } else {
            validatorObj[key] = !isNotEmpty.test(validatedObj[key]);
          }
        }
      }
    }
    this.returndObj = validatorObj;
    return {error: Object.values(validatorObj).indexOf(true) >= 0 } ;
  }
}
