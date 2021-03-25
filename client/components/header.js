import Link from "next/link";
import { Menu, Button } from "antd";
import { UserOutlined, LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import { signIn, signOut, useSession } from "next-auth/client";
const { SubMenu } = Menu;
const Header = () => {
  const [session, loading] = useSession();
  return (
    <Menu mode="horizontal">
      {session?.user ? (
        <SubMenu
          key="Profile"
          icon={<UserOutlined />}
          style={{ float: "right" }}
        >
          <Menu.Item>
            <Link href="/profile">
              <a>Your profile</a>
            </Link>
          </Menu.Item>

          <Menu.Item onClick={signOut}>Signout</Menu.Item>
        </SubMenu>
      ) : (
        <Menu.Item
          key="Sign in"
          icon={<LoginOutlined />}
          style={{ float: "right" }}
        >
          <a onClick={signIn}>Sign In</a>
        </Menu.Item>
      )}
    </Menu>
  );
};

export default Header;
