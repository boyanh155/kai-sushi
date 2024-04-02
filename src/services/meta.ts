import axios, { AxiosError } from "axios";

export const sendMessageToManyRecipients: (
  recipients: string[],
  text: string,
  vars?: Record<any, any>
) => Promise<any> = (recipients, text, vars) =>
  new Promise((resolve, reject) => {
    let _text = text;

    if (vars) {
      for (const _var in vars) {
        _text = _text.replace(new RegExp(`\\[${_var}\\]`, "g"), vars[_var]);
      }
    }

    const _promises: Promise<unknown>[] = recipients.map(
      (_id: string) =>
        new Promise((_resolve, _reject) => {
          axios
            .post(
              `https://graph.facebook.com/v19.0/me/messages`,
              {},
              {
                params: {
                  recipient: { id: _id },
                  message: { text: _text },
                  message_type: "MESSAGE_TAG",
                  tag: "CONFIRMED_EVENT_UPDATE",
                  access_token: process.env.FB_PAGE_ACCESS_TOKEN,
                },
              }
            )
            .then((res) => {
              _resolve(res.data);
            })
            .catch((err: AxiosError) => {
              console.log(err.response?.data);
              _reject(err.response?.data);
            });
        })
    );
    return resolve(Promise.allSettled(_promises));
  });
