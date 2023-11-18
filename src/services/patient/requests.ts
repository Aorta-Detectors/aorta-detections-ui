import commonApi from '@/http/commonApi'
import api from '@/http'

const infoBasePath = '/info';
export default class InfoRequests {
    static async get_patient(patientOMS: number | string) {
        return api.get(`${infoBasePath}/get_patient?patient_id=${patientOMS}`);
    }
    static async add_appointment(payloadParams: any, examination_id: number) {
        return api.put(`${infoBasePath}/add_appointment?examination_id=${examination_id}`, payloadParams);
    }
    static async create_examination(payloadParams: any) {
        return api.post(`${infoBasePath}/create_examination`, payloadParams);
    }
    static async general_info() {
        return api.get(`${infoBasePath}/general_info`);
    }
}
