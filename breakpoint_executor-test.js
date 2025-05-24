// Grupo formado por Francisco Ramírez Cañadas y Jorge Repullo Serrano.

import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    scenarios: {
        breakpoint: {
            executor: 'ramping-arrival-rate', // Incrementa la carga exponencial
            preAllocatedVUs: 1000, //VUs alocados inicialmente
            maxVUs: 1e7, //VUs maximo
            stages: [
                { duration: '10m', target: 100000 },
            ]
        }
    },
    thresholds: {
        http_req_failed: [{
        threshold: 'rate<=0.01',
        abortOnFail: true,
    }]}
};

export default () => {
    const urlRes = http.get('http://localhost:8080/medico/1');
    check(urlRes, {
        'status is 200': (r) => r.status === 200,
    })
    sleep(1);
};