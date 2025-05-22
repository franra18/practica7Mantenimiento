import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 5, // Usuarios virtuales
    duration: '1m', // Tiempo de duración
    thresholds: {
        http_req_failed: [{ threshold: 'rate==0', abortOnFail: true }], // No debe haber fallos
        http_req_duration: [{ threshold: 'avg<100', abortOnFail: true }], // Promedio < 100ms
    },
};

export default () => {
    const urlRes = http.get('http://localhost:8080/medico/1');
    sleep(1);
};