import FooterMain from "@/components/shared/Footer/FooterMain";
import { AppConfig } from "@/libs/AppConfig";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  weight: ["400", "700", "500", "300"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});


export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {

  const messages = useMessages();
  return (
    <html lang={locale}>
      <body className={nunito.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="pb-72">{children}</div>
        </NextIntlClientProvider>
        <FooterMain />
      </body>
    </html>
  );
}
