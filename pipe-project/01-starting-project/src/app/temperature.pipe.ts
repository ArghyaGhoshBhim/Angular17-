import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'temp',
    standalone: true
})
export class TemperaturePipe implements PipeTransform {
    transform(value: string | number, inputTemp: 'cel' | 'fah' = 'cel', outputTemp: 'cel' | 'fah' = 'fah') {
        if (typeof value == 'string') {
            value = parseFloat(value);
        }
        let calTemp: number
        if (inputTemp === 'cel' && outputTemp === 'fah') {
            calTemp = value * (9 / 5) + 32;
        } else if (inputTemp === 'fah' && outputTemp === 'cel') {
            calTemp = (value - 32) * (5 / 9);
        } else {
            calTemp = value;
        }

        if (outputTemp === 'cel') {
            return `${calTemp.toFixed(2)} °C`
        }

        return `${calTemp.toFixed(2)} °F`
    }
}