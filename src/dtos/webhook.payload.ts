interface customerData {
  company_name: string;
  name: string;
  email: string;
  phone: string;
}

interface itemData {
  name: string;
  fk_id: number;
}

export interface webhookPayload {
  metadata: {
    id: number;
    object: string;
    action: string;
    company_id: number;
    datetime: string;
  },
  current: customerData | itemData;
}