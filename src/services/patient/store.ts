import { defineStore } from 'pinia';
import { handleError } from '@/utils/handleError';
import InfoRequests from '@/services/patient/requests';
import router from '@/router';
import axios from 'axios';
import Notification from '@/utils/Notification'
import SecurityRequests from '@/services/security/requests'
import { OMC_NOT_FOUND } from '@/constants/conts'

export const usePatientStore = defineStore('patientStore', {
    state: () => ({
        is_patient_exist: false,
        isLoading: false
    }),
    getters: {
        patientExists(state) {
            return state.is_patient_exist;
        },
        isLoadingOMC(state) {
            return state.isLoading;
        }
    },


    actions: {
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
                    console.log(e)
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
