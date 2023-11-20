import { computed, Injectable, Signal } from "@angular/core";
import { SignalService } from "../../common/signals.service";
import { FetchService } from "../../common/fetch.service";
import { Params } from "@angular/router";

@Injectable({ providedIn: "root" })
export class PatientService extends SignalService {
   constructor(
      fetchService: FetchService
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

   getPrescriptions = (id: string) => {
      return this.getObject<Prescription[]>(`prescriptions/${id}`);
   }

   getContentCurrentPatientId = <T>(params: Signal<Params | undefined>, signalFunction: (id: string) => Signal<T>) => {
      return computed(() => {
         const paramsContent = params();
         const patientId = paramsContent ? paramsContent["patientId"] : undefined;
         if (!patientId) {
            return null;
         }

         return signalFunction(patientId)();
      });
   }
}

export type PatientInfo = { name: string, age: number, image: string; gender: string, height: number, weight: number, bloodType: string, allergies: string[], lastVisit: string };

export type VitalSigns = { heartRate: number, bodyTemperature: number, glucoseLevel: number };

export type ResultType = "normal" | "warning" | "critical";
export type TestReport = { label: string, resultType: ResultType, date: string };

export type PrescriptionType = "medication" | "therapy";
export type Prescription = { label: string, type: PrescriptionType, date: string; durationAmount: number, durationUnit: string };
