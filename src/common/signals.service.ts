import { effect, inject, Injector, Signal, signal } from "@angular/core";
import { FetchService } from "./fetch.service";

export abstract class SignalService {
   private readonly injector: Injector;
   protected constructor(
      protected fetchService: FetchService
   ) {
      this.injector = inject(Injector);
   }

   private createGuid() {
      const s4 = () =>
         Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
      return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
   }

   public onChange = signal(this.createGuid());
   public contentChanged() {
      this.onChange.set(this.createGuid());
   }

   private dictionary: { [url: string]: Signal<any> } = {};
   protected getObject<T>(path: string) {
      if (!this.dictionary[path]) {
         const fetchSignal = signal<T | undefined>(undefined);
         effect(async () => {
            const _ = this.onChange();
            const result = await this.fetchService.getObject<T>(path);
            fetchSignal.set(result);
         }, { injector: this.injector });
         this.dictionary[path] = fetchSignal;
      }

      return <Signal<T>>this.dictionary[path];
   }

   // for conceptual GETs that have to be queried via a HTTP Post (because we need a BODY to send all query data to the backend)
   protected postObject<TIn, TOut>(path: string, value: TIn) {
      const key = `${path}_${JSON.stringify(value)}`;
      if (!this.dictionary[key]) {
         const fetchSignal = signal<TOut | undefined>(undefined);
         effect(async () => {
            const _ = this.onChange();
            const result = await this.fetchService.post<TIn, TOut>(path, value);
            fetchSignal.set(result);
         }, { injector: this.injector });
         this.dictionary[key] = fetchSignal;
      }

      return <Signal<TOut>>this.dictionary[key];
   }
}
