import http from 'k6/http';
import { sleep } from 'k6';
// EJECUTAR CON LA GRAFICA Y PEGAR RESULTADO EN EL INFORME
export const options = {
    stages: [
        { duration: '3m', target: 2400 }, // IMPORTANTE: AQUI VA EL 80% del punto de rotura 
        { duration: '3m', target: 2400 },
        { duration: '2m', target: 0 },
    ],
    thresholds: {
        http_req_failed: [{ threshold: 'rate<0.01', abortOnFail: true }], // < 1% peticiones fallidas
        http_req_duration: [{ threshold: 'avg<1000', abortOnFail: true }], // duración promedio < 1000ms
    },
};

export default () => {
    const urlRes = http.get('http://localhost:8080/medico/1');
    sleep(1);
};