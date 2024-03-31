import FooterMain from "@/components/shared/Footer/FooterMain";
import Loading from "@/components/shared/Loading";
import ApiProvider from "@/libs/ApiProvider";
import { AppConfig } from "@/libs/AppConfig";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { Nunito } from "next/font/google";
import { Suspense } from "react";

const nunito = Nunito({
  weight: ["400", "700", "500", "300"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "vi" }];
}
export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const messages = useMessages();
  return (
    <html lang={locale} data-theme="winter">
      <body className={nunito.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="min-h-[calc(100vh-110px)] overflow-x-hidden relative before:block before:h-full before:top-0 before:left-0 before:inset-0 before:opacity-50 before:absolute before:w-screen before:bg-black bg-opacity-60 w-screen  before:bg-no-repeat  before:bg-cover z-10 before:z-0  before:bg-center  before:bg-[url('../../src/assets/bg-home.png')]">
            <ApiProvider>
              <Suspense fallback={<Loading />}>
                <main className="w-full h-full relative">{children}</main>
              </Suspense>
            </ApiProvider>
          </div>
        </NextIntlClientProvider>
        <FooterMain />
      </body>
    </html>
  );
}
