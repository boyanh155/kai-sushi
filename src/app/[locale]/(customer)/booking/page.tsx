import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return redirect('booking/order-info')
}

export default page