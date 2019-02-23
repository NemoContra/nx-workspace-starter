import { Command, CommandRunner } from 'nest-commander';

@Command({ name: 'log', description: 'A log command' })
export class LogCommand extends CommandRunner {
  async run(params: string[]): Promise<void> {
    console.log('Passed params', params.toString());
  }
}
