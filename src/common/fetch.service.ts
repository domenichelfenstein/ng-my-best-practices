import { APP_BASE_HREF } from "@angular/common";
import { Inject, Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class FetchService {
   constructor(
      @Inject(APP_BASE_HREF) baseHref: string
   ) {
      this.url = `${baseHref}/assets/fake-api.json`;
   }

   private url: string;

   async post<TIn, TOut>(path: string, value: TIn) {
      const response = await fetch(`${this.url}?${path}`, {
         method: 'GET',
         headers: this.getHeaders(),
      });
      const json = await response.json();
      const responses = this.navigate(json, path);
      const [responseCode, responseBody] = this.getResponse(responses, value);
      if (responseCode >= 400) {
         throw new Error(responseBody);
      }
      return responseBody as TOut;
   }

   async getObject<T>(path: string) {
      const response = await fetch(`${this.url}?${path}`, {
         method: 'GET',
         headers: this.getHeaders(),
      });
      const json = await response.json();
      const [responseCode, responseBody] = this.navigate(json, path);
      if (responseCode >= 400) {
         throw new Error(responseBody);
      }
      return responseBody as T;
   }

   private navigate(jsonObject: any, path: string): any {
      const firstPart = path.split('/')[0];
      const remainingPath = path.substring(firstPart.length + 1);
      const nextObject = jsonObject[firstPart];
      if (nextObject == undefined) {
         throw new Error(`Path ${ path } not found`)
      }
      if (remainingPath.length == 0) {
         return nextObject;
      }
      return this.navigate(nextObject, remainingPath);
   }

   private getResponse(responses: any, body: any) {
      const bodyKeyJson = JSON.stringify(body);
      for (const responsesKey in responses) {
         let responseKeyJson = null;
         try {
            responseKeyJson = JSON.parse(responsesKey);
         } catch {
            responseKeyJson = responsesKey;
         }
         const responseKey = JSON.stringify(responseKeyJson);
         if (bodyKeyJson == responseKey) {
            return responses[responsesKey];
         }
      }

      return responses["default"];
   }

   private getHeaders(): HeadersInit {
      const token = '<someToken>';
      return {
         Authorization: `Bearer ${ token }`,
         'Content-type': 'application/json; charset=UTF-8',
      };
   }
}
