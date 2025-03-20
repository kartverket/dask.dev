import { createBackend } from '@backstage/backend-defaults';


const backend = createBackend();


backend.add(import('@kartverket/backstage-plugin-dask-onboarding-backend'));

backend.start();
