import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '0s', target: 50000 },
        { duration: '10m', target: 100000 }
    ],
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