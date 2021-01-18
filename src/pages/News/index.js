import { connect } from 'umi';
import { useEffect, useState, useReducer } from 'react';
import { PageContainer } from '@ant-design/pro-layout';

const news = (props) => {
  let { newsList, dispatch } = props;
  console.log(newsList);
  const changeData = () => {
    if (dispatch) {
      dispatch({
        type: 'news/addNewList',
      });
    }
  };
  const [count, setCount] = useState(0); // count 变量是简单的数据类型
  const [obj, setObj] = useState({
    name: 'jack',
    children: { name: 'rose', course: ['Chinese', 'English'] },
  });
  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'news/getNewsList',
      });
    }
  }, []);
  const addCount = () => {
    setCount((count) => count + 1);
  };
  const changeObj = () => {
    setObj((obj) => {
      addCount();
      console.log({
        ...obj,
        children: { name: `rose_${count}`, course: [...obj.children.course, 'Mathematics'] },
      });
      //   return {
      //     ...obj,
      //     children: { name: `rose_${count}`, course: [...obj.children.course, 'Mathematics'] },
      //   };
      let { name, children } = obj;
      return {
        name,
        children: { ...children, course: [...children.course, 'Mathematics'] },
      };
    });
  };
  const initState = { n: 0 };
  const reducer = (state, action) => {
    if (action.type === 'add') {
      return { n: state.n + action.number };
    } else if (action.type === 'multi') {
      return { n: state.n * 2 };
    } else {
      throw new Error('unknow type');
    }
  };
  const [state, dispatchNew] = useReducer(reducer, initState);
  const { n } = state;
  const onClick1 = () => {
    dispatchNew({ type: 'add', number: 1 });
  };
  const onClick2 = () => {
    dispatchNew({ type: 'multi', number: 2 });
  };
  return (
    <PageContainer>
      <p>{count}</p>

      <button onClick={addCount}>按钮点我+1</button>
      <p>
        {obj.name}有个小孩，他的名字叫{obj.children.name},上了课程有如下
        <ul>
          {obj.children.course.map((v) => {
            return <li key={v.id}>{v}</li>;
          })}
        </ul>
      </p>
      <button onClick={changeObj}>按钮点我+1</button>
      <ul>
        {newsList &&
          newsList.map((v) => {
            return <li key={v.id}>{v}</li>;
          })}
      </ul>
      <button onClick={changeData}>点我改变数组</button>
      <hr />
      <h4>react hooks - useReducer</h4>
      <h4>{n}</h4>
      <button onClick={onClick1}>点我改变数组</button>
      <button onClick={onClick2}>点我改变数组</button>
    </PageContainer>
  );
};
export default connect(({ news }) => {
  return {
    newsList: news.newList,
  };
})(news);
