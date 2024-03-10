import { Layout } from 'antd'
import React from 'react'

const { Header, Footer, Sider, Content } = Layout

const App = (): JSX.Element => (
  <Layout>
    <Sider>Sider</Sider>
    <Layout>
      <Header>Header</Header>
      <Content>Content</Content>
      <Footer>Footer</Footer>
    </Layout>
  </Layout>
)
export default App
