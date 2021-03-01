import Link from "next/link";
import { Menu } from "antd";
import { UserOutlined, LoginOutlined, LogoutOutlined } from "@ant-design/icons";

const Header = ({ currentUser }) => {
  const links = [
    !currentUser && {
      label: "Sign In",
      href: "/auth/signin",
      icon: <LoginOutlined />,
    },
    !currentUser && {
      label: "Sign Up",
      href: "/auth/signup",
      icon: <UserOutlined />,
    },
    currentUser && {
      label: "Sign Out",
      href: "/auth/signout",
      icon: <LogoutOutlined />,
    },
  ]
    .filter((linkConfig) => linkConfig) // filters out any entries that are falsey
    .map(({ label, href, icon }) => {
      return (
        <Menu.Item key={label} icon={icon} style={{ float: "right" }}>
          <Link href={href}>
            <a>{label}</a>
          </Link>
        </Menu.Item>
      );
    });
  return <Menu mode="horizontal">{links}</Menu>;
};

export default Header;
