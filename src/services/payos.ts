import PayOS from "@payos/node";

const clientID = process.env.PAYOS_CLIENT_ID;
const apiKey = process.env.PAYOS_API_KEY;
const checksumKey = process.env.PAYOS_CHECKSUM_KEY;
if (!clientID || !apiKey || !checksumKey) {
  throw new Error(
    "PAYOS_CLIENT_ID, PAYOS_API_KEY, and PAYOS_CHECKSUM_KEY must be set in the environment variables"
  );
}
const payOS = new PayOS(clientID, apiKey, checksumKey);

export class PayOSService {
  constructor(private readonly payOS: PayOS) {
    this.payOS = payOS;
  }

  createPaymentLink: (
    body: PayOsType.CheckoutRequestType
  ) => Promise<PayOsType.CheckoutResponseDataType> = (body) =>
    this.payOS.createPaymentLink(body);

  getPaymentLinkInformation: (
    id: string | number
  ) => Promise<PayOsType.PaymentLinkDataType> = (id) =>
    this.payOS.getPaymentLinkInformation(id);

  cancelPaymentLink: (
    id: string | number,
    cancelReason?: string
  ) => Promise<PayOsType.PaymentLinkDataType> = (id, cancelReason) =>
    this.payOS.cancelPaymentLink(id, cancelReason);
}
