import { describe, expect, test } from '@jest/globals';
import { HealthCheckController } from '../controller/HealthCheckController';

const { mockRequest, mockResponse } = require('mock-req-res');
const _controller = new HealthCheckController();
const req = mockRequest();
const res = mockResponse();

describe('Health Check Controller', () => {

  it('deve estar definido', () => {
    expect(_controller).toBeDefined();
  });

  it('retornar OK para aplicação', () => {
    jest.spyOn(res, 'sendStatus').mockReturnValue(200)
    const result = _controller.check(req, res)
    expect(result).toBe(200);
  });
});