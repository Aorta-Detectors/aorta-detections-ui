import commonApi from '@/http/commonApi'
import api from '@/http'

const infoBasePath = '/info';
export default class InfoRequests {
    static async get_patient(patientOMS: number | string) {
        return api.get(`${infoBasePath}/get_patient?patient_id=${patientOMS}`);
    }
    static async create_appointment(payloadParams: any) {
        return commonApi().post(`${infoBasePath}/create_appointment`, payloadParams);
    }
    static async general_info() {
        return commonApi().get(`${infoBasePath}/general_info`);
    }
}
