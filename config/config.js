// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/home',
            },
            {
              path: '/home',
              name: 'home',
              icon: 'Home',
              component: './Home',
            },
            {
              path: '/sys',
              name: 'sys',
              icon: 'setting',
              routes: [
                {
                  path: '/sys/admin',
                  name: 'admin',
                  icon: 'smile',
                  component: './System/Administrator',
                  authority: ['admin'],
                },
                {
                  path: '/sys/role',
                  name: 'role',
                  icon: 'smile',
                  component: './System/Role',
                  authority: ['admin'],
                },
                {
                  path: '/sys/menus',
                  name: 'menus',
                  icon: 'smile',
                  component: './System/Menu',
                  authority: ['admin'],
                },
              ],
            },
            {
              path: '/welcome',
              name: 'welcome',
              icon: 'smile',
              component: './Welcome',
            },
            {
              path: '/react_hooks',
              name: 'react_hooks',
              icon: 'smile',
              component: './R_hook',
            },
            {
              path: '/news',
              name: 'news',
              icon: 'smile',
              component: './News',
              routes: [
                {
                  path: '/news/a',
                  name: 'a',
                  icon: 'smile',
                  component: './news',
                  authority: ['admin'],
                },
              ],
            },
            {
              path: '/admin',
              name: 'admin',
              icon: 'crown',
              component: './Admin',
              authority: ['admin'],
              routes: [
                {
                  path: '/admin/sub-page',
                  name: 'sub-page',
                  icon: 'smile',
                  component: './Welcome',
                  authority: ['admin'],
                },
              ],
            },
            {
              name: 'list.table-list',
              icon: 'table',
              path: '/list',
              component: './ListTableList',
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
