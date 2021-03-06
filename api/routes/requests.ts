import express from 'express';
const router = express.Router();

import RequestsController from '../controllers/requests';

import getAuthenticatedUser from '../middleware/get-authenticated-user'; // Ensures the user is logged in. later on used to get what the user is allowed to view and access

router.get('/', getAuthenticatedUser as any, RequestsController.get_all_requests as any);

export default router;
