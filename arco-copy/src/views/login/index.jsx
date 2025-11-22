import './login.scss';
import {
  Form,
  Input,
  Button,
  Space,
  Checkbox,
  Typography,
} from '@arco-design/web-react';
import {
  IconUser,
  IconSafe,
  IconGithub,
  IconWechat,
  IconFile,
} from '@arco-design/web-react/icon';
export default function Login() {
  const [form] = Form.useForm();
  const handleSubmit = async (formItem) => {
    //
  };
  return (
    <div className="login-wrap">
      <div className="login-left">
        <div className="login-left-content"></div>
        <Typography.Title className="login-text">
          ARCO ADMIN TEMPLATE
        </Typography.Title>{' '}
        <Typography.Text className="login-text">
          点击右侧登录即可体验
        </Typography.Text>
        <div className="btn">
          <Space size={16}>
            <Button shape="round" type="primary" icon={<IconGithub />}>
              Github
            </Button>
            <Button shape="round" type="primary" icon={<IconFile />}>
              文档
            </Button>
            <Button shape="round" type="primary" icon={<IconWechat />}>
              微信交流群
            </Button>
          </Space>
        </div>
      </div>
      <div className="login-form">
        <div className="form-warp">
          <Typography.Title>您好！</Typography.Title>
          <Typography.Title heading={5}>欢迎登录Arco Admin</Typography.Title>
          <Form
            form={form}
            wrapperCol={{
              span: 24,
            }}
            initialValues={{
              username: 'admin',
              password: 123456,
            }}
            onSubmit={handleSubmit}
          ></Form>
        </div>
      </div>
    </div>
  );
}
