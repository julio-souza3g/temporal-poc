import { proxyActivities } from '@temporalio/workflow';
// Only import the activity types
import type * as activities from './activities';
import { webhookPayload } from './dtos/webhook.payload';

const { sendWebhookToConsumer } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
  retry: {
    maximumAttempts: 5,
    initialInterval: '5 seconds',
    maximumInterval: '1 minute',
    backoffCoefficient: 2,
  },
});

/** A workflow that simply calls an activity */
export async function sendWebhooksWorkflow(webhook: webhookPayload): Promise<string> {
  await sendWebhookToConsumer(webhook);
  return 'Success!';
}