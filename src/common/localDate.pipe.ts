import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
   standalone: true,
   name: "localDate"
})
export class LocalDatePipe implements PipeTransform {
   transform(value: string | undefined) {
      return value == undefined ? "" : new Date(value)
         .toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
   }
}
