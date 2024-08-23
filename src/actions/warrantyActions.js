import axios from 'axios';

const baseURL = 'http://192.168.29.123:7073/adiance';
// const baseURL = 'https://seahorse-app-2-3o2pf.ondigitalocean.app/api'; 

const instance = axios.create({
    baseURL: baseURL
});

export async function getWarrantyDetails(deviceId) {
    console.log('deviceId:', deviceId);
    try {
        const params = { deviceId: deviceId };
        const token = localStorage.getItem('token');

        // const response = await instance.get('/allcamera', {
        const response = await instance.get('/getExpiry', {
            params: params,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                // Add any other headers if needed
            },
        });
        return response;

    } catch (error) {
        throw error;
    }
}

export async function sendSupportMail(data) {
    const token = localStorage.getItem('token');
    try {
        const response = await instance.post('/sendSupportMail', data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                // Add any other headers if needed
            }
        });
        console.log("rekha", response);
        return response;
    } catch (error) {
        throw error;
    }
}