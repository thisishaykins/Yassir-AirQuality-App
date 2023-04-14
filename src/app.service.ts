import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to Air Quality REST Service Mini Project!';
  }

  airFlow() {
    return [{}];
  }
}
