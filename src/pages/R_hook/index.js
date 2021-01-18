import React, { useReducer, useRef, useState, useEffect } from 'react';

export default function ShoppingList() {
  const inputRef = useRef();
  const [items, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'add':
        return [
          ...state,
          {
            id: state.length,
            name: action.name,
          },
        ];

      case 'remove':
        return state.filter((_, index) => index != action.index);

      case 'clear':
        return [];
      default:
        return state;
    }
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    dispatch({
      type: 'add',
      name: inputRef.current.value,
    });
    inputRef.current.value = '';
  }
  const t = useRef(null);
  const [name, setName] = useState('ajanuw');
  useEffect(() => {
    t.current = name;
  });
  const prevName = t.current;
  return (
    <>
      <p>useRef、useReducer简单基本使用</p>
      <form onSubmit={handleSubmit}>
        <input ref={inputRef} />
      </form>
      <button className="button is-danger" onClick={() => dispatch({ type: 'clear' })}>
        clear
      </button>
      <ul>
        {items.map((item, index) => (
          <li className="section" key={item.id}>
            {item.name}
            <button className="button" onClick={() => dispatch({ type: 'remove', index })}>
              X
            </button>
          </li>
        ))}
      </ul>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <h2>{name}</h2>
      <p>{prevName}</p>
    </>
  );
}
