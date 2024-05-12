"use client";

import Image from "next/image";
import logoSquare from "@/public/logo.svg";
import { useTranslations } from "next-intl";

import { useRouter } from "next/navigation";
import { gideon } from "@/libs/GoogleFont";

const HomeMain = () => {
  const t = useTranslations("Home");
  const router = useRouter();

  const moveToListMenu = (type: "food" | "beverage" | "lunch" | "cafe") => {
    router.push("/" + type);
  };
  return (
    <div className="flex flex-col content-container items-center pt-14 pb-32   overflow-x-visible">
      {/* Center logo */}
      <div className="w-[60px] max-h-[60px] snap-start">
        <Image src={logoSquare} className="w-full h-auto" alt="Kai logo" />
      </div>
      <h1 className={`text-white mt-6 uppercase text-3xl ${gideon.className}`}>
        {t("menu")}
      </h1>
      {/* --------------MENU-------------- */}
      {/* Button group - MENU*/}
      <div className="flex flex-col items-center mt-16 gap-2  snap-start">
        {/* CAFE */}
        <div className="golden-title font-bold text-xl">
          {t("cafe_label")}&nbsp;|&nbsp;
          <span className="uppercase">8am - 2pm</span>
        </div>
        <div
          onClick={() => moveToListMenu("cafe")}
          className="active:bg-[#8C773E99] active:border-0 font-light uppercase hover:opacity-60 transition-all cursor-pointer border border-[#B7B4B1] text-base rounded-sm p-4 w-56 text-center"
        >
          {t("beverage")}
        </div>
        {/* MAIN MENU */}
        <div className="golden-title font-bold text-xl mt-20">
          {t("dinner_label")}&nbsp;|&nbsp;
          <span className="uppercase">4pm - 10pm</span>
        </div>

        <div
          onClick={() => moveToListMenu("food")}
          className="active:bg-[#8C773E99] active:border-0 font-light uppercase hover:opacity-60 transition-all cursor-pointer border border-[#B7B4B1] text-base rounded-sm p-4 w-56 text-center"
        >
          {t("food")}
        </div>
        <div
          onClick={() => moveToListMenu("beverage")}
          className="active:bg-[#8C773E99] active:border-0  font-light mt-2 uppercase hover:opacity-60 transition-all cursor-pointer border border-[#B7B4B1] text-base rounded-sm p-4 w-56 text-center"
        >
          {t("beverage")}
        </div>
      </div>
      {/* --------------MENU-------------- */}

      {/* BOUNCE SCROLL */}
      <div className="mt-14">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          className="animate-bounce-fade-in"
          height="9"
          viewBox="0 0 16 9"
          fill="none"
        >
          <path
            d="M14 1.61597L7.99995 7.23193L2 1.61597"
            stroke="#FEFEFE"
            strokeWidth="3.12519"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {/* Address content */}
      <div className="mt-28 flex flex-col items-center  snap-start">
        {/* Small log */}
        <div className="w-[60px] max-h-[60px]">
          <Image src={logoSquare} className="w-full h-auto" alt="Kai logo" />
        </div>
        <p className="text-xs text-center w-60 mt-6 font-light">
          {t("address1")}
        </p>
        <div className="flex flex-row-reverse mt-4">
          {/* Open gg */}
          {/* <IconButton
            size="medium"
            className="text-white cursor-pointer tooltip-bottom transition-all tooltip"
            data-tip={t("google_map")}
            onClick={() =>
              window.open("https://maps.app.goo.gl/LYy9G6vWYYdCLeTY8", "_blank")
            }
          >
            <PlaceIcon />
          </IconButton> */}
          {/* embedded map */}
        </div>
        {/* frame map */}

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4269969477878!2d106.7568407731047!3d10.778571889370289!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175250037db517f%3A0x85970d4da0e1e6cb!2sKAI%20Sushi%26Lounge!5e0!3m2!1svi!2s!4v1712025491006!5m2!1svi!2s"
          className="border-0 w-[110%] min-h-[220px] md:min-h-[500px] md:min-w-[750px]"
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        {/*s Phone */}

        <a
          href="tel:090 634 10 53"
          className="cursor-pointer mt-4 hover:opacity-60 transition-all tracking-wider px-8 py-1 bg-[#424242] font-light text-xs text-center border border-[#5B5B5B] rounded-sm"
        >
          090 634 10 53
        </a>
        {/* Open time  */}
        {/* <div className="font-light uppercase text-lg golden-title mt-12">
          {t("open_time")}
        </div>
        <div className="text-white uppercase font-light text-sm tracking-wide mt-4">
          {t("specific_time")}
        </div> */}
        {/* social media */}

        <div className="flex flex-col gap-4 mt-28 items-center">
          <div className="font-light uppercase text-lg golden-title">
            {t("follow_us")}
          </div>
          {/* facebook */}
          <div className="flex flex-row gap-3">
            <a
              href="https://m.facebook.com/people/KAI-SushiLounge/61554674166345/"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
              >
                <path
                  d="M13.86 4.87673H15.5834V1.96173C14.749 1.87497 13.9106 1.83213 13.0717 1.8334C10.5784 1.8334 8.87337 3.35507 8.87337 6.14173V8.5434H6.0592V11.8067H8.87337V20.1667H12.2467V11.8067H15.0517L15.4734 8.5434H12.2467V6.46257C12.2467 5.50007 12.5034 4.87673 13.86 4.87673Z"
                  fill="#FEFEFE"
                />
              </svg>
            </a>

            {/* instagram */}
            <a
              href="https://www.instagram.com/kaisushiloungesg/"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
              >
                <path
                  d="M15.895 5.00504C15.6775 5.00504 15.4648 5.06955 15.2839 5.19042C15.103 5.31129 14.962 5.48309 14.8788 5.68409C14.7955 5.88509 14.7737 6.10626 14.8162 6.31964C14.8586 6.53302 14.9634 6.72902 15.1172 6.88286C15.2711 7.0367 15.4671 7.14146 15.6804 7.1839C15.8938 7.22635 16.115 7.20456 16.316 7.12131C16.517 7.03805 16.6888 6.89706 16.8097 6.71617C16.9305 6.53527 16.995 6.3226 16.995 6.10504C16.995 5.8133 16.8791 5.53351 16.6729 5.32722C16.4666 5.12093 16.1868 5.00504 15.895 5.00504ZM20.1117 7.22337C20.0939 6.46281 19.9514 5.71033 19.69 4.99587C19.457 4.38458 19.0942 3.83105 18.6267 3.37337C18.1728 2.90351 17.618 2.54304 17.0042 2.31921C16.2916 2.04985 15.5383 1.90415 14.7767 1.88837C13.805 1.83337 13.4934 1.83337 11 1.83337C8.50671 1.83337 8.19504 1.83337 7.22337 1.88837C6.46176 1.90415 5.70844 2.04985 4.99587 2.31921C4.38324 2.5453 3.8289 2.90547 3.37337 3.37337C2.90351 3.82729 2.54304 4.38211 2.31921 4.99587C2.04985 5.70844 1.90415 6.46176 1.88837 7.22337C1.83337 8.19504 1.83337 8.50671 1.83337 11C1.83337 13.4934 1.83337 13.805 1.88837 14.7767C1.90415 15.5383 2.04985 16.2916 2.31921 17.0042C2.54304 17.618 2.90351 18.1728 3.37337 18.6267C3.8289 19.0946 4.38324 19.4548 4.99587 19.6809C5.70844 19.9502 6.46176 20.0959 7.22337 20.1117C8.19504 20.1667 8.50671 20.1667 11 20.1667C13.4934 20.1667 13.805 20.1667 14.7767 20.1117C15.5383 20.0959 16.2916 19.9502 17.0042 19.6809C17.618 19.457 18.1728 19.0966 18.6267 18.6267C19.0963 18.1707 19.4593 17.6167 19.69 17.0042C19.9514 16.2898 20.0939 15.5373 20.1117 14.7767C20.1117 13.805 20.1667 13.4934 20.1667 11C20.1667 8.50671 20.1667 8.19504 20.1117 7.22337ZM18.4617 14.6667C18.455 15.2486 18.3496 15.8251 18.15 16.3717C18.0037 16.7706 17.7686 17.1311 17.4625 17.4259C17.1652 17.7288 16.8055 17.9634 16.4084 18.1134C15.8618 18.313 15.2852 18.4184 14.7034 18.425C13.7867 18.4709 13.4475 18.48 11.0367 18.48C8.62587 18.48 8.28671 18.48 7.37004 18.425C6.76586 18.4364 6.16425 18.3433 5.59171 18.15C5.21201 17.9924 4.86878 17.7584 4.58337 17.4625C4.27912 17.1681 4.04698 16.8073 3.90504 16.4084C3.68124 15.8539 3.55711 15.2643 3.53837 14.6667C3.53837 13.75 3.48337 13.4109 3.48337 11C3.48337 8.58921 3.48337 8.25004 3.53837 7.33337C3.54248 6.73851 3.65108 6.14899 3.85921 5.59171C4.02058 5.20479 4.26828 4.85989 4.58337 4.58337C4.86187 4.26819 5.20605 4.01788 5.59171 3.85004C6.15046 3.64841 6.73937 3.54303 7.33337 3.53837C8.25004 3.53837 8.58921 3.48337 11 3.48337C13.4109 3.48337 13.75 3.48337 14.6667 3.53837C15.2486 3.54505 15.8251 3.65043 16.3717 3.85004C16.7883 4.00464 17.1621 4.25598 17.4625 4.58337C17.7629 4.86495 17.9977 5.20921 18.15 5.59171C18.3538 6.1499 18.4592 6.73917 18.4617 7.33337C18.5075 8.25004 18.5167 8.58921 18.5167 11C18.5167 13.4109 18.5075 13.75 18.4617 14.6667ZM11 6.29754C10.0704 6.29935 9.16209 6.57669 8.38997 7.09451C7.61786 7.61233 7.01655 8.34739 6.66204 9.20682C6.30752 10.0662 6.2157 11.0115 6.39819 11.9231C6.58067 12.8347 7.02926 13.6717 7.68728 14.3284C8.3453 14.9852 9.18322 15.4321 10.0952 15.6128C11.0071 15.7935 11.9522 15.6999 12.8109 15.3437C13.6696 14.9875 14.4035 14.3848 14.9198 13.6117C15.4361 12.8385 15.7117 11.9297 15.7117 11C15.7129 10.3814 15.5918 9.7686 15.3553 9.19692C15.1189 8.62524 14.7717 8.10595 14.3338 7.66892C13.896 7.23189 13.376 6.88575 12.8039 6.65039C12.2317 6.41504 11.6187 6.29512 11 6.29754ZM11 14.0525C10.3963 14.0525 9.80614 13.8735 9.30416 13.5381C8.80218 13.2027 8.41093 12.726 8.1799 12.1682C7.94886 11.6104 7.88841 10.9967 8.00619 10.4045C8.12398 9.8124 8.4147 9.2685 8.8416 8.8416C9.2685 8.4147 9.8124 8.12398 10.4045 8.00619C10.9967 7.88841 11.6104 7.94886 12.1682 8.1799C12.726 8.41093 13.2027 8.80218 13.5381 9.30416C13.8735 9.80614 14.0525 10.3963 14.0525 11C14.0525 11.4009 13.9736 11.7978 13.8202 12.1682C13.6668 12.5385 13.4419 12.875 13.1585 13.1585C12.875 13.4419 12.5385 13.6668 12.1682 13.8202C11.7978 13.9736 11.4009 14.0525 11 14.0525Z"
                  fill="#FEFEFE"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeMain;
