import { FormControl, ValidationErrors } from "@angular/forms";

export class AppValidators {
    static notOnlyWhiteSpace(control: FormControl) : ValidationErrors | null{
        if((control.value != null) && (control.value.trim().length === 0)){
            return {"notOnlyWhiteSpace": true};
        }
        return null;
    }
    
    static noWhiteSpace(control: FormControl) : ValidationErrors | null{
        if((control.value != null) && (control.value as String).indexOf(' ') >= 0){
            return {"noWhiteSpace": true};
        }
        return null;
    }

    static min2Length(control: FormControl) : ValidationErrors | null{
        if((control.value != null) && (control.value.trim().length < 2)){
            return {"minLength": true};
        }
        return null;
    }

    static min8Length(control: FormControl) : ValidationErrors | null{
        if((control.value != null) && (control.value.trim().length < 8)){
            return {"minLength": true};
        }
        return null;
    }
}
