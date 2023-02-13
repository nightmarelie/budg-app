import { repl } from '@nestjs/core';
import { AppModule } from './app.module';

// For more details refer to the doc https://docs.nestjs.com/recipes/repl
async function bootstrap() {
  const replServer = await repl(AppModule);

  replServer.setupHistory('.nestjs_repl_history', (err) => {
    if (err) {
      console.error(err);
    }
  });
}

bootstrap();
