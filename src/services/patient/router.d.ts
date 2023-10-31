export declare const PatientRoutes: {
    path: string;
    name: string;
    component: any;
    meta: {
        PageTitle: string;
        requiredAuth: boolean;
    };
    children: ({
        path: string;
        alias: string;
        name: string;
        components: {
            default: any;
        };
        meta: {
            PageTitle: string;
        };
    } | {
        path: string;
        name: string;
        components: {
            default: any;
        };
        meta: {
            PageTitle: string;
        };
        alias?: undefined;
    })[];
}[];
