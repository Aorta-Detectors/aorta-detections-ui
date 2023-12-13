import commonApi from '@/http/commonApi'
import api from '@/http'

 export const infoBasePath = '/info';
export default class InfoRequests {
    /*
    * GET
    * */
    static async getExaminationsList({page = 1, size = 30}) {
        return api.get(`${infoBasePath}/get_examinations?page=${page}&size=${size}`);
    }
    static async getExaminationById(id) {
        return api.get(`${infoBasePath}/get_examination?examination_id=${id}`);
    }
    static async getPatientsList({page = 1, size = 30}) {
        return api.get(`${infoBasePath}/patients_page?page=${page}&size=${size}`);
    }
    static async get_patient(patientOMS: number | string) {
        return api.get(`${infoBasePath}/get_patient?patient_id=${patientOMS}`);
    }

    static async create_examination(payloadParams: any) {
        return api.post(`${infoBasePath}/create_examination`, payloadParams);
    }
    static async general_info() {
        return api.get(`${infoBasePath}/general_info`);
    }
    static async get_examination(examination_id: number | string) {
        return api.get(`${infoBasePath}/get_examination?examination_id=${examination_id}`);
    }
    static async get_status(id) {
        return api.get(`${infoBasePath}/get_status?appointment_id=${id}`);
    }
    static async get_appointment(id) {
        return api.get(`${infoBasePath}/get_appointment?appointment_id=${id}`);
    }
    static async get_slice(param) {
        return api.get(`${infoBasePath}/get_rotated_slice_masked?${param}`);
    }

    /*
    * PUT
    * */
    static async add_appointment(payloadParams: any, examination_id: number) {
        return api.put(`${infoBasePath}/add_appointment?examination_id=${examination_id}`, payloadParams);
    }
    static async update_appointment(payload: any, appointment_id: number) {
        return api.put(`${infoBasePath}/update_appointment?appointment_id=${appointment_id}`, payload);
    }
    static async add_file(payloadParams: any, appointment_id: number) {
        return api.put(`${infoBasePath}/add_file?appointment_id=${appointment_id}`, payloadParams);
    }
    /*
    * DELETE
    * */
    static async delete_examination(examination_id: number) {
        return api.delete(`${infoBasePath}/delete_examination?examination_id=${examination_id}`);
    }
    static async delete_appointment(appointment_id: number) {
        return api.delete(`${infoBasePath}/delete_appointment?appointment_id=${appointment_id}`);
    }
}
