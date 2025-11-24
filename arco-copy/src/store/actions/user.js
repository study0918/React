import {
  login
} from '@/api/user';

export const loginHandler = (payload) => async (dispatch) => {
  const {
    data
  } = await login(payload);
  console.log('data', data)
}
