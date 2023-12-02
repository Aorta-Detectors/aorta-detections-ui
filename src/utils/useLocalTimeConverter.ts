import type { UnwrapRef } from 'vue'
import type { IExamination } from '@/services/patient/models/reception.interfaces'

export const convertToLocalTime = (isoDateString: UnwrapRef<IExamination['created_at']> | UnwrapRef<UnwrapRefSimple<IExamination>['created_at']> | undefined) => {
    const date = new Date(isoDateString);

    if (isNaN(date.getTime())) {
        return;
    }

    return date.toLocaleString()
};

