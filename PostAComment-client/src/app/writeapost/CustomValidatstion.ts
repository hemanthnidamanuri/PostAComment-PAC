import {AbstractControl} from "@angular/forms";


export class CustomValidatstion{

  static whitespaceremover(control: AbstractControl){
    let rmvspace;
    let tle:string = control.value;
    if(tle != null){
      rmvspace = tle.trim();
    }
    if(rmvspace != ''){
      return null;
    }else{
      return {
        hasspace: true
      };
    }
  }
}
