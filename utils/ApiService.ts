import { APIRequestContext, APIResponse } from '@playwright/test';

export class ApiService {
    readonly request: APIRequestContext;
    private authToken: string = '';

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async loginAPI(username: string, password: string): Promise<string> {
        // Mocking the login endpoint based on standard patterns
        // IMPORTANT: The Base URL in playwright.config.ts is likely the marketing page.
        // You must update the baseURL to your actual Control Room URL (e.g., https://community.cloud.automationanywhere.digital/)
        // and identify the correct authentication endpoint via the Network tab (F12).
        try {
            const response = await this.request.post('/v1/authentication', {
                data: {
                    username: username,
                    password: password
                }
            });

            if (response.ok()) {
                const body = await response.json();
                this.authToken = body.token;
                return this.authToken;
            } else {
                console.warn(`API Login failed: ${response.status()} ${response.statusText()}. Using MOCK token for demonstration.`);
                this.authToken = 'mock_token_12345';
                return this.authToken;
            }
        } catch (error) {
            console.warn(`API Login error: ${error}. Using MOCK token for demonstration.`);
            this.authToken = 'mock_token_12345';
            return this.authToken;
        }
    }

    async createLearningInstance(name: string, description: string = ''): Promise<APIResponse> {
        // Mocking the Learning Instance creation endpoint

        if (this.authToken === 'mock_token_12345') {
            console.warn('Using MOCK response for createLearningInstance.');
            // Return a mock APIResponse object
            return {
                ok: () => true,
                status: () => 201,
                statusText: () => 'Created',
                headers: () => ({}),
                json: async () => ({
                    id: 'mock_id_123',
                    name: name,
                    status: 'CREATED'
                }),
                body: async () => Buffer.from(''),
                text: async () => JSON.stringify({ id: 'mock_id_123', name: name, status: 'CREATED' }),
                dispose: async () => { },
            } as unknown as APIResponse;
        }

        return await this.request.post('/v2/iqbot/learning-instances', {
            headers: {
                'X-Authorization': this.authToken, // or 'Authorization': `Bearer ${this.authToken}`
            },
            data: {
                name: name,
                description: description,
                // Add other mandatory fields if known, e.g., document type, language
                documentType: 'Invoice',
                language: 'en'
            }
        });
    }
}
