import Link from "next/link";
import { Menu, Button } from "antd";
import { UserOutlined, LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import { signIn, signOut, useSession } from "next-auth/client";

const Header = () => {
  const [session, loading] = useSession();
  console.log(session);
  const links = [
    !session?.user && {
      label: "Sign In",
      icon: <LoginOutlined />,
      onClick: signIn,
    },
    session?.user && {
      label: "Sign Out",
      icon: <LogoutOutlined />,
      onClick: signOut,
    },
  ]
    .filter((linkConfig) => linkConfig) // filters out any entries that are falsey
    .map(({ label, icon, onClick }) => {
      return (
        <Menu.Item key={label} icon={icon} style={{ float: "right" }}>
          <a onClick={onClick}>{label}</a>
        </Menu.Item>
      );
    });
  return <Menu mode="horizontal">{links}</Menu>;
};

export default Header;
