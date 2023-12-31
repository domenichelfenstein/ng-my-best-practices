import { inject, Signal, signal } from "@angular/core";
import { FetchService } from "./fetch.service";

export abstract class SignalService {
   protected fetchService = inject(FetchService);

   private onUpdateNotifiers: (() => void)[] = [];
   public contentChanged() {
      this.onUpdateNotifiers.forEach(x => x());
   }

   private dictionary: { [url: string]: Signal<any> } = {};
   protected getObject<T>(path: string, debug = false) {
      if (!this.dictionary[path]) {
         if(debug) {
            console.log("getObject.noDictionaryItemFound", path);
         }

         const fetchSignal = signal<T | undefined>(undefined);
         const callback = async () => {
            if(debug) {
               console.log("getObject.callback");
            }
            const callbackResult = await this.fetchService.getObject<T>(path);
            if(debug) {
               console.log("getObject.callbackResult", callbackResult);
            }
            setTimeout(() =>{ // HACK to make sure the signal change is detected
               fetchSignal.set(callbackResult);
            })
         };
         this.onUpdateNotifiers.push(callback);
         callback();
         this.dictionary[path] = fetchSignal;

         if(debug) {
            console.log("getObject.fetchSignalAdded", path);
         }
      }

      if(debug) {
         console.log("getObject.beforeReturn");
      }
      return <Signal<T>>this.dictionary[path];
   }

   // for conceptual GETs that have to be queried via a HTTP Post (because we need a BODY to send all query data to the backend)
   protected postObject<TIn, TOut>(path: string, value: TIn) {
      const key = `${path}_${JSON.stringify(value)}`;
      if (!this.dictionary[key]) {
         const fetchSignal = signal<TOut | undefined>(undefined);
         const callback = () => this.fetchService.post<TIn, TOut>(path, value).then(fetchSignal.set);
         this.onUpdateNotifiers.push(callback);
         callback();
         this.dictionary[key] = fetchSignal;
      }

      return <Signal<TOut>>this.dictionary[key];
   }
}
