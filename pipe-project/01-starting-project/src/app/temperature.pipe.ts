import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'temp',
    standalone: true
})
export class TemperaturePipe implements PipeTransform {
    transform(value: string | number) {
        if (typeof value == 'string') {
            value = parseFloat(value);
        }

        const outPutTemp = value * (9 / 5) + 32;
        return `${outPutTemp} °F`
    }
}