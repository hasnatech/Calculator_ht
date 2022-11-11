import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'minusSignPipe'
})
export class MinusSignPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if (value != null) {
            return value.charAt(0) === '-' ?
                '(' + value.substring(1, value.length) + ')' :
                value;
        }
    }
}