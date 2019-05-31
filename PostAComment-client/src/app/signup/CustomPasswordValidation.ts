import {FormGroup} from "@angular/forms";

export function match(pwd:string,cpwd:string) {
  return(formgroup:FormGroup) =>{

    const mainpwd = formgroup.controls[pwd];
    const confrmpwd = formgroup.controls[cpwd];

    if(confrmpwd.errors && !confrmpwd.errors.matchpwds){
      return;
    }
    if (mainpwd.value !== confrmpwd.value) {
      confrmpwd.setErrors({ matchpwds: true });
    } else {
      confrmpwd.setErrors(null);
    }
  }
}
