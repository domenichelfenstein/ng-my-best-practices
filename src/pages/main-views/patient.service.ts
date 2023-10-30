import { computed, Injectable, Signal } from "@angular/core";
import { SignalService } from "../../common/signals.service";
import { FetchService } from "../../common/fetch.service";
import { AuthService } from "../../auth.service";

@Injectable()
export class PatientService extends SignalService {
   constructor(
      fetchService: FetchService,
      private authService: AuthService
   ) {
      super(fetchService);
   }

   getPatientInfo = (id: string) => {
      return this.getObject<PatientInfo>(`information/${id}`);
   }

   getVitalSigns = (id: string) => {
      return this.getObject<VitalSigns>(`vitalsigns/${id}`);
   }

   getTestReports = (id: string) => {
      return this.getObject<TestReport[]>(`test-reports/${id}`);
   }

   getContentCurrentUserId = <T>(signalFunction: (id: string) => Signal<T>) => {
      return computed(() => {
         const userId = this.authService.userId();
         if (!userId) {
            return null;
         }

         return signalFunction(userId)();
      });
   }
}

export type PatientInfo = { name: string, age: number, image: string; gender: string, height: number, weight: number, bloodType: string, allergies: string[], lastVisit: string };

export type VitalSigns = { heartRate: number, bodyTemperature: number, glucoseLevel: number };

export type ResultType = "normal" | "warning" | "critical";

export type TestReport = { label: string, resultType: ResultType, date: string };
