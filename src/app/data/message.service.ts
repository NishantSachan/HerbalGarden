import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class MessageService{
    displayMessage():string{
        return "Hi from service message what can i do for you ?"
    }
}