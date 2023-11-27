import { defineStore } from 'pinia';
import { handleError } from '@/utils/handleError';
import InfoRequests from '@/services/patient/requests';
import router from '@/router';
import axios from 'axios';
import Notification from '@/utils/Notification'
import SecurityRequests from '@/services/security/requests'
import { OMC_NOT_FOUND } from '@/constants/conts'
import type { IExaminations, IRequestedExamination, IPatients, IRequestedPatient } from '@/services/patient/models/reception.interfaces'

type TState = {
    is_patient_exist: boolean,
    isLoading: boolean,
    examinations: IExaminations, 
    patients: IPatients
}
export const usePatientStore = defineStore('patientStore', {
    state: () : TState => ({
        is_patient_exist: false,
        isLoading: false,
        examinations: {
            current_page: null,
            objects_count_on_current_page: null,
            page_total_count: null,
            requested_examinations: []
        },
        patients: {
            current_page: null,
            objects_count_on_current_page: null,
            page_total_count: null,
            requested_patients: []
        }
    }),
    getters: {
        patientExists(state: TState): boolean {
            return state.is_patient_exist;
        },

        isLoadingOMC(state: TState): boolean {
            return state.isLoading;
        },

        totalPages(state: TState): number {
            return state.examinations.page_total_count;
        },

        currentPage(state: TState): number {
            return state.examinations.current_page;
        },

        examinationsList(state: TState) : IRequestedExamination[] {
            return state.examinations.requested_examinations
        }, 

        totalPatientsPages(state: TState): number {
            return state.patients.page_total_count;
        },

        currentPatientsPage(state: TState): number {
            return state.patients.current_page;
        },

        patientsList(state: TState) : IRequestedPatient[] {
            return state.patients.requested_patients
        }
    },

    actions: {
        async getExaminationsList(page?: number, size?: number) {
            this.isLoading = true
            try {
                const { data, status } = await InfoRequests.getExaminationsList({page, size});
                this.examinations = data
            }
            catch (e) {
                throw e;
            }finally {
                this.isLoading = false
            }
        },
        async getPatientsList(page?: number, size?: number) {
            this.isLoading = true
            try {
                const { data, status } = await InfoRequests.getPatientsList({page, size});
                this.patients = data
            }
            catch (e) {
                throw e;
            }finally {
                this.isLoading = false
            }
        },
        async addAppointment(payload: any, examination_id: number) {
            try {
                const { data, status } = await InfoRequests.add_appointment(payload, examination_id);
            }
            catch (e) {
                const errorMessage = handleError(e);
                console.error(errorMessage);
                throw e;
            }
        },

        async createExamination(payload: any) {
            try {
                const { data, status } = await InfoRequests.create_examination(payload);
            }
            catch (e) {
                const errorMessage = handleError(e);
                console.error(errorMessage);
                throw e;
            }
        },

        async getPatient(OMSNumber: number) {
            this.isLoading = true
            try {
                const { data, status } = await InfoRequests.get_patient(OMSNumber)
                this.is_patient_exist = status === 200 && data !== undefined;
            }
            catch (e) {
                if (axios.isAxiosError(e) && e.response) {
                    let resp = e?.response
                    if(resp?.status === 404){
                        this.is_patient_exist = false
                        Notification.error(OMC_NOT_FOUND)
                    } else {
                        throw e;
                    }
                } else {
                    throw e;
                }
            }finally {
                this.isLoading = false
            }
        },
    }
});
