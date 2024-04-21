import FooterMain from "@/components/shared/Footer/FooterMain";
import { GoogleAnalytics } from "@next/third-parties/google";
import LocaleSwitcher from "@/components/shared/LocaleSwitcher";
import ApiProvider from "@/libs/ApiProvider";
import { nunito } from "@/libs/GoogleFont";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import Loading from "./loading";

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
          <div className=" flex relative before:block before:pointer-events-none before:bg-cover before:top-0 before:left-0 before:inset-0 before:opacity-90 before:absolute before:w-screen before:bg-black bg-opacity-60 w-screen  before:bg-no-repeat before:z-0 before:bg-center before:bg-fixed  before:bg-[url('https://s3-alpha-sig.figma.com/img/83c5/4836/c3a083b4444408bc8bffb8324ca412c3?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MxEQSv5gOqyLYtVdaJj1cXei5b4M-sT4QePRvGFVoJgi4PpfcyLTWb42vW83yBpRpRCbYKDTdPrRQ8dwih64Ds90I8KhyZDIGPXZc44ixBUG1E28RJ3Bzvb4nFDaOtHEu6mF0IlEcNBeU3zhFr3J9XkLJSdSCy5wt-cGPWAhe5FD9PD1Qpckr4mgyJljUUnTAVHi~WBLddhzCwoZrtoqen16x~bedLiVgU~AsztC~Z7Y5lIjr--Je9-H7jfxdEjHbqb-Kjki0uWSh-0NxM4wvVA4Mt67eEYKnsJHnugp-gFa7v4xpYvAp0DKpaNHsmu-FqZJqgisOMPtCCdIV5zmXA__')]">
            <ApiProvider>
              <Suspense fallback={<Loading />}>
                <main className="w-full relative pb-[101px] min-h-screen flex justify-center">
                  <LocaleSwitcher />
                  {children}
                </main>
              </Suspense>
            </ApiProvider>
          </div>
          <FooterMain />
        </body>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTIC_ID!} />
      </html>
    </NextIntlClientProvider>
  );
}
