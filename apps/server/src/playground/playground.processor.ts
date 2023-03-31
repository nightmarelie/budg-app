import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('playground')
export class PlaygroundProcessor {
  @Process('task')
  async handleTask(job: Job) {
    console.log(job.data);
  }

  @Process('task1')
  async handleTask1(job: Job) {
    console.log(job.data);
  }
}
