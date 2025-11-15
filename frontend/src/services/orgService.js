import api from './api';

export const fetchOrgById = (orgId) => api.get(`/orgs/${orgId}`);

export const fetchOrgQueues = (orgId) => api.get(`/orgs/${orgId}/queues`);

