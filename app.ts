import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';

import { studentRoute, studentsRoute, parentRoute, parentsRoute, instructorRoute, instructorsRoute, userRoute, settingsRoute, requestRoute, requestsRoute, schoolsRoute } from './api/routes';

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use('/api/student', studentRoute);
app.use('/api/students', studentsRoute);
app.use('/api/parent', parentRoute);
app.use('/api/parents', parentsRoute);
app.use('/api/instructor', instructorRoute);
app.use('/api/instructors', instructorsRoute);
app.use('/api/user', userRoute);
app.use('/api/user/settings', settingsRoute);
app.use('/api/request', requestRoute);
app.use('/api/requests', requestsRoute);
app.use('/api/schools', schoolsRoute)

export default app;
