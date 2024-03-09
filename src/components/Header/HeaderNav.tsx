import { BellOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SearchOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Avatar, Badge, Button, Col, Divider, Dropdown, Layout, Row, Typography } from 'antd'
import Link from 'next/link'
import React, { useState } from 'react'
import useDevice from 'src/hook/useDevice'
const { Header } = Layout

const {Text} = Typography

// const items: MenuProps['items'] = [
//   {
//     key: '1',
//     label: (
//       <div className='header-nav'>
//         <div className="d-flex justify-content-between align-items-center pt-15 pb-15 pl-20 fw-medium font-16">
//           <h4 className="mb-0 list-details-color font-16 sub-header"><span>Notification</span> <span className="number-cell font-14">11</span></h4>
//         </div>
//         <div className="height-397 overflow-y-scroll">
//           <List
//             bordered
//             dataSource={data}
//             renderItem={() => (
//               <List.Item>
//                 <Row className="w-100 align-items-center">
//                   <Col span="3">
//                     <Avatar src="https://api.dicebear.com/7.x/initials/svg?seed=John Smith" size={36} />
//                   </Col>
//                   <Col span="21" className="d-flex align-items-start justify-content-between">
//                     <div className="avatar-details-left">
//                       <div className="list-details-color font-14"><strong>John Smith</strong> has added as a follower you a ticket (#182)</div>
//                     </div>
//                     <div className="font-12 icon-color pt-2">3:17 PM</div>
//                   </Col>
//                 </Row>
//               </List.Item>
//             )}
//           />
//         </div>
//         <div className="text-center pt-16 pb-16">
//           <p className="d-block font-14 theme-text-color">Clear All</p>
//         </div>
//       </div>
//     )
//   }
// ]



interface PropTypes {
  collapsed: boolean;
  setCollapsed: (param: boolean) => void;
  marginWidth: number;
  setOpenDrawer: (param: boolean) => void;
}
const HeaderNav = ({
  collapsed,
  setCollapsed,
  marginWidth,
  setOpenDrawer,
}: PropTypes): JSX.Element => {

  const { isMobileDevice } = useDevice();

  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const responsiveMenu = [
  {
    key: "analytics",
    label: (
      <Link target="new" href={`/analytics`}>
        <Text>Analytics</Text>
      </Link>
    ),
  },
  {
    key: "assign",
    label: (
      <Link target="new" href={`/assign`}>
        <Text>Assign</Text>
      </Link>
    ),
  },
  {
    key: "request",
    label: (
      <Link target="new" href={`/request`}>
        <Text>Request</Text>
      </Link>
    ),
  },
];
const menuItems: MenuProps['items'] = [
  {
    key: 'profile',
    label: <Link target='new' href={`/profile`}>
      <p className="font-weight-normal pl-2">My Account</p>
    </Link>
  },
  ...(isMobileDevice ? responsiveMenu : []),
  {
    key: 'sign-out',
    label: (
      <p className='pl-2'>
        Sign Out
      </p>
    ),
  }
]

  return (
    <Header
      style={{
        marginLeft: collapsed ? `${marginWidth}px` : `${marginWidth}px`,
      }}
      className="bg-white fix-header"
    >
      <Row align="middle" className='w-100'>
        <Col span={12} md={12}>
          <div className="header-left-panel">
            <Button
              className="text-default"
              type="link"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() =>
                isMobileDevice ? showDrawer() : setCollapsed(!collapsed)
              }
            />
            <Button type="text" icon={<SearchOutlined />} />
            {!isMobileDevice && (
              <div className="header-menu-list ms-2">
                {responsiveMenu.map((item) => (
                  <span key={item.key}>{item.label}</span>
                ))}
              </div>
            )}
          </div>
        </Col>
        <Col span={12} md={12}>
          <div className="header-right-panel d-flex justify-content-end align-items-center">
            <div className="d-flex align-items-center">
              <Dropdown
                menu={{ items: menuItems }}
                trigger={["click"]}
                placement="bottomRight"
              >
                <Badge count={1} size="small">
                  <BellOutlined className="font-19 header-nav-icon ms-2 icon-color cursor-pointer" />
                </Badge>
              </Dropdown>
            </div>
            <Divider type="vertical" className="mx-4 h-36" />
            <Dropdown
              menu={{ items: menuItems }}
              trigger={["click", "hover"]}
              placement="bottomRight"
            >
              <div className="d-flex align-items-center cursor-pointer">
                <div className="profile-nav d-flex align-items-center">
                  <Avatar
                    src="https://api.dicebear.com/7.x/initials/svg?seed=Kamalesh%20Maity                                                                      "
                    size={32}
                  />
                </div>
              </div>
            </Dropdown>
          </div>
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderNav