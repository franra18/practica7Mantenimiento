import http from "k6/http";
import { sleep } from 'k6';
// EJECUTAR CON LA GRAFICA Y PEGAR RESULTADO EN EL INFORME
export const options = {
    stages: [
        { duration: '3m', target: 1500 }, // IMPORTANTE: En el target va el 50% de VUs del punto de rotura sin executors
        { duration: '3m', target: 1500 },
        { duration: '2m', target: 0 },
    ],
    thresholds: {
        http_req_failed: [{ threshold: 'rate<0.01', abortOnFail: true }], // < 1% peticiones fallidas
    }
};

export default () => {
    const urlRes = http.get('http://localhost:8080/medico/1');
    sleep(1);
};