import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('playground')
export class PlaygroundProcessor {
  @Process('task')
  async handleTask(job: Job) {
    console.log(job.data);
  }
}
