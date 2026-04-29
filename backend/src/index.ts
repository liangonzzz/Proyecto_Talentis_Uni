import 'reflect-metadata';
import { ServerBootstrap } from './infrastructure/bootstrap/ServerBootstrap';

ServerBootstrap.start().catch(console.error);