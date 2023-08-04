import { Connection, Client } from '@temporalio/client';
import { sendWebhooksWorkflow } from './workflows';
import { nanoid } from 'nanoid';

async function run() {
  // Connect to the default Server location (localhost:7233)
  const connection = await Connection.connect();
  // In production, pass options to configure TLS and other settings:
  // {
  //   address: 'foo.bar.tmprl.cloud',
  //   tls: {}
  // }

  const client = new Client({
    connection,
    // namespace: 'foo.bar', // connects to 'default' namespace if not specified
  });

  const handle = await client.workflow.start(sendWebhooksWorkflow, {
    // type inference works! args: [name: string]
    args: [{
      metadata: {
        id: 1,
        object: 'item',
        action: 'created',
        company_id: 8,
        datetime: new Date().toISOString(),
      },
      current: {
        name: 'Item 1',
        fk_id: 1,
      }
    }],
    taskQueue: 'webhooks',
    // in practice, use a meaningful business ID, like customerId or transactionId
    workflowId: 'workflow-' + nanoid(),
  });
  console.log(`Started workflow ${handle.workflowId}`);

  // optional: wait for client result
  console.log(await handle.result());
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});