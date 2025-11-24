import request from '@/utils/request.js';

export const login = async (data) =>
  request({
    url: '/login',
    method: 'post',
    data
  });
