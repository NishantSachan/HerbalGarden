import { FormGroup } from "@angular/forms";

//Generic Validator for reactive Forms 
export class GenericValidator{
    constructor(private validationMessages:{[key:string]: {[key:string] : string}} ){ } 
        
        //process each control within a FormGroup and return a set of Validation messages to display
        processMessage(container:FormGroup):{[key:string]:string}{
            const messages:any={};
            for(const controlKey in container.controls){
                if(container.controls.hasOwnProperty(controlKey)){
                    const c = container.controls[controlKey];
                    //If it is a FormGroup, process its child controls
                    if(c instanceof FormGroup){
                        const childMessages=this.processMessage(c);
                        Object.assign(messages,childMessages);
                    }
                    else{
                        //only validate if there are validation message for the control
                        if(this.validationMessages[controlKey]){
                            messages[controlKey]='';
                            if( (c.touched || c.dirty) && c.errors ){
                                Object.keys(c.errors).map(messageKey=>{
                                    if(this.validationMessages[controlKey][messageKey]){
                                        messages[controlKey] = this.validationMessages[controlKey][messageKey];
                                    }
                                })
                            } 
                        }
                    }
                }
            }
            return messages;
    }
}