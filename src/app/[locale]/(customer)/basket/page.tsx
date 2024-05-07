'use client'

import { useRouter } from "@/navigation";


const BasketPage = () => {
    const router = useRouter();
  return router.replace('/basket/checkout');
};

export default BasketPage;
