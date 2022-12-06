import { FormControl, ValidationErrors } from "@angular/forms";

export class AppValidators {
    static notOnlyWhiteSpace(control: FormControl) : ValidationErrors | null{
        if((control.value != null) && (control.value.trim().length === 0)){
            return {"notOnlyWhiteSpace": true};
        }
        return null;
    }

    static minLength(control: FormControl) : ValidationErrors | null{
        if((control.value != null) && (control.value.trim().length < 2)){
            return {"minLength": true};
        }
        return null;
    }
}
