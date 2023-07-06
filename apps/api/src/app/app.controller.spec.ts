import { Test, TestingModule } from '@nestjs/testing';
import Redis from 'ioredis';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { apiEnv } from '../environments/environment';

const { redis } = apiEnv;

describe('AppController', () => {
	let app: TestingModule;

	beforeAll(async () => {
		app = await Test.createTestingModule({
			controllers: [AppController],
			providers: [
				AppService,
				{
					provide: 'REDIS_CLIENT',
					useValue: new Redis({
						host: redis.host,
						port: Number.parseInt(redis.port)
					})
				}
			]
		}).compile();
	});

	describe('getData', () => {
		it('should return "Welcome to Alma"', () => {
			const appController = app.get<AppController>(AppController);
			expect(appController.getData()).toEqual('Welcome to Alma');
		});
	});
});
