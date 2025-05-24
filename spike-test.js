// Grupo formado por Francisco Ramírez Cañadas y Jorge Repullo Serrano.

import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    stages: [
        { duration: '1m', target: 1200 }, // 40% de VUs del punto de rotura sin executors
        { duration: '1m', target: 0 },
    ],
    thresholds: {
        http_req_failed: [{ threshold: 'rate<=0.005'}], // Las peticiones fallidas son inferiores a 0.5%
    }
};

export default () => {
    const urlRes = http.get('http://localhost:8080/medico/1');
    sleep(1);
};