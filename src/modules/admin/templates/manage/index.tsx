import React from 'react'

import { Form, Input } from 'antd'

import type { ModalPropTypes } from 'src/types/common'

import { InfoTooltip } from '@/components/Common'
import { FormItemWrapper, ModalWrapper, SelectWrapper, InputWrapper } from '@/components/Wrapper'
import FormWrapper from '@/components/Wrapper/FormWrapper'
import { getModalTitle } from '@/utils/commonFunctions'

const AddTemplateForm = ({ openModal, setOpenModal, selectedId }: ModalPropTypes<never>): JSX.Element => {
  const [form] = Form.useForm()
  return (
    <ModalWrapper
      open={openModal}
      bodyScroll
      onCancel={() => setOpenModal(false)}
      title={getModalTitle(selectedId as string)}
    >
      <FormWrapper form={form} layout="vertical">
        <FormItemWrapper
          name="name"
          label="Template Name"
          rules={[{ required: true, message: 'Please enter the template name' }]}
        >
          <InputWrapper placeholder="Enter template name" />
        </FormItemWrapper>

        <FormItemWrapper
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please enter a description' }]}
        >
          <Input.TextArea rows={3} placeholder="Enter description" />
        </FormItemWrapper>

        <FormItemWrapper
          name="repoUrl"
          label="Git Repository URL"
          rules={[
            { required: true, message: 'Please enter the repository URL' },
            { type: 'url', message: 'Please enter a valid URL' },
          ]}
        >
          <Input placeholder="https://github.com/yourorg/repo.git" />
        </FormItemWrapper>

        <FormItemWrapper
          name="framework"
          label="Framework"
          rules={[{ required: true, message: 'Please select a framework' }]}
          initialValue="Next.js"
        >
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
          <Input placeholder="https://template-preview.vercel.app" />
        </FormItemWrapper>

        <FormItemWrapper
          name="envVariables"
          label={<InfoTooltip title="Separate with comma and space">Environment Variables</InfoTooltip>}
          // getValueFromEvent={e => console.log("====val", e.target.value)}
        >
          <SelectWrapper mode="tags" tokenSeparators={[',', ' ']} placeholder="VAR1, VAR2, VAR3" />
        </FormItemWrapper>
      </FormWrapper>
    </ModalWrapper>
  )
}

export default AddTemplateForm
