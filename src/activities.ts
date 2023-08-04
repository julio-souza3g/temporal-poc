import axios from "axios";

import { webhookPayload } from "./dtos/webhook.payload";

export async function sendWebhookToConsumer(data: webhookPayload): Promise<void> {
  // const hookURL = 'https://webhook.site/a7eb5652-f89c-4b0b-b557-b49ab2c1918f';
  const hookURL = 'http://localhost:3939/webhook';
  try {
    const response = await axios.post(hookURL, data, { timeout: 10000 });
    const delivered = response.status >= 200 && response.status < 300;

    if (!delivered) {
      throw new Error(`Webhook failed with status ${response.status}`);
    }
  } catch (error: any) {
    throw new Error(`Error sending webhook: ${error.message}`);
  }
}