import { Injectable } from '@nestjs/common';
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';

export interface Dog {
  name: string;
  type: string;
}

@Injectable()
export class DogHealthIndicator extends HealthIndicator {
  private dogs: Dog[] = [
    { name: 'Fido', type: 'goodboy' },
    { name: 'Rex', type: 'badboy' },
  ];
  async isHealth(key: string): Promise<HealthIndicatorResult> {
    const badboys = this.dogs.filter((dog) => dog.type === 'badboy');
    const isHealthy = badboys.length === 0;
    const result = this.getStatus(key, isHealthy, { badboys: badboys.length });
    console.log(isHealthy);
    if (isHealthy) {
      return result;
    }
    throw new HealthCheckError('Dogcheck failed', result);
  }
}
