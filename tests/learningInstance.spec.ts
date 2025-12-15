import { test, expect } from '@playwright/test';
import { ApiService } from '../utils/ApiService';

test.describe('Use Case 3: Learning Instance API Flow', () => {
    let apiService: ApiService;

    test.beforeEach(async ({ request }) => {
        apiService = new ApiService(request);
    });

    test('Create Learning Instance via API', async () => {
        const username = process.env.PROD_USERNAME!;
        const password = process.env.PROD_PASSWORD!;

        // Login to get token
        await apiService.loginAPI(username, password);

        const instanceName = `LI_${Date.now()}`;
        const startTime = Date.now();

        // Create Learning Instance
        const response = await apiService.createLearningInstance(instanceName, 'API Created Instance');

        const endTime = Date.now();
        const duration = endTime - startTime;

        // Validate Status
        expect(response.status()).toBe(201); // Or 200 depending on API

        // Validate Response Time (optional check, e.g., < 2000ms)
        console.log(`Response time: ${duration}ms`);
        expect(duration).toBeLessThan(5000);

        // Validate Schema
        const body = await response.json();
        expect(body).toHaveProperty('id');
        expect(body).toHaveProperty('name', instanceName);
        expect(body).toHaveProperty('status'); // e.g., 'CREATED' or 'ACTIVE'
    });
});
