import commonApi from '@/http/commonApi'

const infoBasePath = '/info';
export default class InfoRequests {
    static async get_patient(patientOMS: any) {
        return commonApi().get(`${infoBasePath}/get_patient`, patientOMS);
    }
    static async create_appointment(payloadParams: any) {
        return commonApi().post(`${infoBasePath}/create_appointment`, payloadParams);
    }
    static async general_info() {
        return commonApi().get(`${infoBasePath}/general_info`);
    }
}
