'use client'
import React from 'react'

import { Form, Input, Radio } from 'antd'

import type { ModalPropTypes } from 'src/types/common'

import { InfoTooltip } from '@/components/Common'
import { FormItemWrapper, SelectWrapper, InputWrapper, ModalWrapper } from '@/components/Wrapper'
import FormWrapper from '@/components/Wrapper/FormWrapper'
import { requiredFieldRules, requiredWithWhitspcFieldRules } from '@/constants/AppConstant'
import { getModalTitle } from '@/utils/commonFunctions'

const ThemeLibraryManageComp = ({
  openModal,
  setOpenModal,
  selectedId,
}: ModalPropTypes<never>): JSX.Element => {
  const [form] = Form.useForm()
  return (
    <ModalWrapper
      title={getModalTitle(selectedId as string)}
      open={openModal}
      bodyScroll={'430px'}
      onCancel={() => setOpenModal(false)}
    >
      <FormWrapper form={form} layout="vertical">
        <FormItemWrapper name="name" label="Theme Name" rules={requiredWithWhitspcFieldRules}>
          <InputWrapper placeholder="Enter theme name" />
        </FormItemWrapper>

        <FormItemWrapper name="description" label="Description">
          <Input.TextArea rows={3} placeholder="Enter description" />
        </FormItemWrapper>

        <FormItemWrapper name="repoUrl" label="Git Repository URL" rules={requiredWithWhitspcFieldRules}>
          <InputWrapper placeholder="https://github.com/yourorg/repo.git" />
        </FormItemWrapper>

        <FormItemWrapper name="framework" label="Framework" rules={requiredFieldRules} initialValue="Next.js">
          <SelectWrapper
            options={[
              { label: 'Next.js', value: 'Next.js' },
              { label: 'React', value: 'React' },
              { label: 'Other', value: 'Other' },
            ]}
          />
        </FormItemWrapper>

        <FormItemWrapper
          name="previewUrl"
          label="Preview URL"
          rules={[{ type: 'url', message: 'Please enter a valid URL' }]}
        >
          <InputWrapper placeholder="https://template-preview.vercel.app" />
        </FormItemWrapper>

        <FormItemWrapper
          name="envVariables"
          label={<InfoTooltip title="Separate with comma and space">Environment Variables</InfoTooltip>}
          getValueFromEvent={obj => obj?.map((item: string) => item.toUpperCase().trim())}
        >
          <SelectWrapper mode="tags" tokenSeparators={[',', ' ']} placeholder="VAR1, VAR2, VAR3" />
        </FormItemWrapper>
        <FormItemWrapper label="Select Template">
          <Radio.Group>
            <Radio value={true}>Active</Radio>
            <Radio value={false}>Inactive</Radio>
          </Radio.Group>
        </FormItemWrapper>
      </FormWrapper>
    </ModalWrapper>
  )
}

export default ThemeLibraryManageComp
