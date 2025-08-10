import React from 'react'

import { redirect } from 'next/navigation'

import { API_ROUTES } from '@/constants/ApiConstant'
import { PRODUCT_LIST_ROUTE } from '@/constants/AppConstant'
import ProductManageComp from '@/modules/products/manage'
import { fetchServerSide } from '@/utils/fetchServerSide'

const ManageProductPgae = async ({ params }: { params: { id: string } }): Promise<JSX.Element> => {
  const resp = await fetchServerSide(`${API_ROUTES['product-details']}/${params.id}`)
  if (!resp?.success && params.id !== 'create') {
    redirect(PRODUCT_LIST_ROUTE)
  }

  return <ProductManageComp data={resp?.result} />
}

export default ManageProductPgae
