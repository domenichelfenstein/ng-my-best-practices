import { Injectable } from "@angular/core";
import { SignalService } from "../../common/signals.service";
import { FetchService } from "../../common/fetch.service";

@Injectable()
export class UserInfoService extends SignalService {
   constructor(
      fetchService: FetchService
   ) {
      super(fetchService);
   }

   getUserInfo(id: string) {
      return this.getObject<UserInfo>(`users/${id}`);
   }

   getPatientInfo(id: string) {
      return this.getObject<PatientInfo>(`information/${id}`);
   }

   getVitalSigns(id: string) {
      return this.getObject<VitalSigns>(`vitalsigns/${id}`);
   }
}

export type UserInfo = { id: string, name: string, age: number, image: string };

export type PatientInfo = { gender: string, height: number, weight: number, bloodType: string, allergies: string[], lastVisit: string };

export type VitalSigns = { heartRate: number, bodyTemperature: number, glucoseLevel: number };
