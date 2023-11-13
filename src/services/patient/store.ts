import { defineStore } from 'pinia';
import { handleError } from '@/utils/handleError';
import InfoRequests from '@/services/patient/requests';
import router from '@/router';
import axios from 'axios';

export const usePatientStore = defineStore('patientStore', {
    state: () => ({
        is_patient_exist: {}
    }),
    getters: {
        patientExists(state) {
            return state.is_patient_exist;
        }
    },
    actions: {
        async createAppointment(payload: any) {
            try {
                const { data, status } = await InfoRequests.create_appointment(payload);
            }
            catch (e) {
                const errorMessage = handleError(e);
                console.error(errorMessage);
                throw e;
            }
        },
        async getPatient(OMSnumber: number) {
            try {
                const { data, status } = await InfoRequests.get_patient(OMSnumber);
                if (status === 200 && data !== undefined) {
                    this.is_patient_exist = true;
                } else {
                    this.is_patient_exist = false;
                }
            }
            catch (e) {
                if (axios.isAxiosError(e) && e.response) {
                    let resp = e?.response
                    if(resp?.status === 404){
                      console.log("your message")
                    }
                  }
                // const errorMessage = handleError(e);
                // console.error(errorMessage);
                throw e;
            }
        },
    }
});
