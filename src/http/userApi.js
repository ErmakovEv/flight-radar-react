import { $host, $authHost } from './index';

export const registration = async (email, password) => {
  const res = await $host.post('api/user/reg', {
    email,
    password,
    role: 'ADMIN',
  });
  return res;
};

export const login = async (email, password) => {
  const res = await $host.post('api/user/login', {
    email,
    password,
  });
  return res;
};

export const check = async () => {
  const res = await $host.post('api/user/auth', {});
  return res;
};
