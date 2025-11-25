import {
  Notification,
  Message
} from '@arco-design/web-react';
import {
  GET_USERINFO,
  SET_USERINFO,
  LOGIN,
  SET_PERMISSIONS,
  LOGOUT,
  SET_ACCESS_TOKEN
} from '@/store/action_types';
import {
  login
} from '@/api/user';
import {
  setRoutersHandler
} from './router';
import {
  setting
} from '@/config/setting';

const {
  title,
  tokenName
} = setting;

export const setAccessTokenHandler = (payload) => async (dispatch) => {
  dispatch({
    type: SET_ACCESS_TOKEN,
    payload
  });
};

const getTimeStr = () => {
  const hour = new Date().getHours();
  if (hour < 6) return '凌晨好！';
  if (hour < 9) return '早上好！';
  if (hour < 12) return '上午好！';
  if (hour < 14) return '中午好！';
  if (hour < 17) return '下午好！';
  if (hour < 19) return '傍晚好！';
  if (hour < 22) return '晚上好！';
  return '深夜好！';
};

export const loginHandler = (payload) => async (dispatch) => {
  const {
    data
  } = await login(payload);
  console.log('data', data)
  const accessToken = data[tokenName];
  if (accessToken) {
    await dispatch(setAccessTokenHandler({
      accessToken
    }));
    await dispatch(setRoutersHandler());
    const thisTime = getTimeStr();

    Notification.success({
      title: `${thisTime}！`,
      content: `👏欢迎登录${title}!`
    });
  } else {
    Message.error(`登录接口异常，未正确返回${tokenName}...`);
  }

  dispatch({
    type: LOGIN,
    payload: data.accessToken
  });
}
