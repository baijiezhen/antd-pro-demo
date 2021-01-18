import { queryNews } from '@/services/news';

const NewsModel = {
  namespace: 'news',
  state: {
    // newList: [1, 2, 3],
    maxNum: 3,
  },
  effects: {
    *getNewsList(_, { call, put }) {
      const response = yield call(queryNews);
      console.log(response);
      yield put({
        type: 'saveCurrentNews',
        payload: response,
      });
    },

    // *fetchCurrent(_, { call, put }) {
    //   const response = yield call(queryCurrent);
    //   yield put({
    //     type: 'saveCurrentUser',
    //     payload: response,
    //   });
    // },
  },
  reducers: {
    saveCurrentNews(state, action) {
      return { ...state, newList: action.payload || [] };
    },
    addNewList(state) {
      return { ...state, newList: [...state.newList, state.maxNum + 1], maxNum: state.maxNum + 1 };
    },
  },
};
export default NewsModel;
