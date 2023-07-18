import { Logger, createLogger, format, transports } from 'winston';

import { LndService } from 'src/modules/lnd/lnd.service';
import { createGroupChannel } from 'paid-services';

async function getLogger({ service }) {
  const logger: Logger = createLogger({
    level: 'info',
    defaultMeta: { service },
    transports: [
      new transports.Console({
        format: format.combine(format.prettyPrint()),
      }),
    ],
  });

  return logger;
}

const spawnProcess = async () => {
  try {
    process.on('message', async (msg: any) => {
      try {
        const lnd = await LndService.authenticatedLnd({ node: msg.node });

        const logger = await getLogger({ service: 'create-group-channel' });

        const result = await createGroupChannel({
          lnd,
          logger,
          capacity: msg.args.capacity,
          count: msg.args.count,
          rate: msg.args.rate,
        });

        process.send({ result });

        process.kill(msg.pid);
      } catch (err) {
        process.kill(msg.pid);
        throw err;
      }
    });

    process.on('exit', () => console.log('exiting process'));
  } catch (err) {
    console.error(err);
  }
};

spawnProcess();