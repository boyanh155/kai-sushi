import FooterMain from "@/components/shared/Footer/FooterMain";
import { GoogleAnalytics } from "@next/third-parties/google";
import LocaleSwitcher from "@/components/shared/LocaleSwitcher";
import ApiProvider from "@/libs/ApiProvider";
import { nunito } from "@/libs/GoogleFont";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import Loading from "./loading";
import DetailItemPopup from "@/components/TakeAway/DetailItemPopup";

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "vi" }];
}
export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: "MetaData" });

  return {
    title: t("meta_title"),
    description: t("meta_description"),
  };
}
//
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
    <NextIntlClientProvider locale={locale} messages={messages}>
      <html lang={locale} data-theme="winter">
        <body className={nunito.className}>
          <div
            id="content_wrapper"
            className=" flex relative before:block before:pointer-events-none before:bg-cover before:top-0 before:left-0 before:inset-0 before:opacity-90 before:absolute before:w-full before:bg-black bg-opacity-60 w-full  before:bg-no-repeat before:z-0 before:bg-center before:bg-fixed  before:bg-[url('https://res.cloudinary.com/dw8fi9npd/image/upload/v1714384817/kai-main-bg-638469.png')]"
          >
            <ApiProvider>
              <Suspense fallback={<Loading />}>
                <main
                  id="main_wrapper"
                  className="w-full relative pb-[101px] min-h-screen flex justify-center"
                >
                  <LocaleSwitcher />
                  {children}
                </main>
              </Suspense>
            </ApiProvider>
          </div>
          <FooterMain />
          <DetailItemPopup />
        </body>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTIC_ID!} />
      </html>
    </NextIntlClientProvider>
  );
}
