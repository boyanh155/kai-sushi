import FooterMain from "@/components/shared/Footer/FooterMain";

import LocaleSwitcher from "@/components/shared/LocaleSwitcher";
import ApiProvider from "@/libs/ApiProvider";
import { nunito } from "@/libs/GoogleFont";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import Loading from "./loading";

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
      <body
        className={
          nunito.className + " overflow-x-hidden flex flex-col  min-h-screen"
        }
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="flex-grow flex overflow-x-hidden relative before:block before:bg-cover before:top-0 before:left-0 before:inset-0 before:opacity-50 before:absolute before:w-screen before:bg-black bg-opacity-60 w-screen  before:bg-no-repeat z-10 before:z-0  before:bg-center before:bg-fixed  before:bg-[url('https://s3-alpha-sig.figma.com/img/568a/d21e/f8904ce98a86526c96917fc5aa2575f8?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EhcHlxnz5IFM8h9Jy~ARN-kTNYT4mprkyiUCggbTmYSogism7kiCQZil8JPTMNgdXEfltE9EvOhEvb5NoTDntIvS7tniutVY80ijkGEuKIz49eoQtomEZs~NVDVwhcn9QF1-B8Oq63KD7rW~bXrRDVUvN5q17fN9gu0SCCzuow4PbOpYJc85ABWYJr35hSaNt9NK5NSDCY3mJSQ3KAmu3SU0l-LMXwvsSCtcCaNesTUFiteFpJv6SaZCEJJyXezGcdN3B9buIh6uwOh3E7~W5jwNYkFkIX5STCakC5BfNG71bYJTaZOaY33MhVvXIaRBfwMRKR1sFXHIY5vRaE4oEQ__')]">
            <ApiProvider>
              <Suspense fallback={<Loading />}>
                <main className="w-full relative flex flex-grow">
                  <LocaleSwitcher />
                  {children}
                </main>
              </Suspense>
            </ApiProvider>
          </div>
          <FooterMain />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
