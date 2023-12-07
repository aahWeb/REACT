import { useState, useReducer } from 'react'
import './App.css'

const max = 30;

function generate(numbers) {

  let number = Math.floor(Math.random() * max);
  while (numbers.includes(number)) {
    number = 1 + Math.floor(Math.random() * max);
  }

  return number;
}

function reducer(state, action) {
  if (action.type === 'add_number') {

    if (state.numbers.length === max)
      return {
        ...state,
        message: "list max"
      }

    const number = generate(state.numbers)

    return {
      ...state,
      numbers: [...state.numbers, number],
      count: state.count + 1
    };
  }

  if (action.type === 'create_pairs') {
    const pairs = [];

    for (let i = 0; i < state.numbers.length; i += 2) {
      if (state.numbers[i + 1] === undefined) break;
      pairs.push([state.numbers[i], state.numbers[i + 1]]);
    }

    console.log(pairs)

    if (state.numbers.length % 2 === 1) {
      pairs[pairs.length - 1].push(state.numbers[state.numbers.length - 1])
    }


    return {
      ...state,
      pairs
    }

  }

  throw Error('Unknown action: ' + action.type);

}

const initialState = { numbers: [], count: 0, message: '', pairs: [] };

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { numbers, message, count, pairs } = state;

  function handleAddNumber() {
    dispatch({ type: 'add_number' });
  }

  function handleCreatePairs() {
    dispatch({ type: 'create_pairs' });

  }

  return (
    <>
      <p>{count}</p>
      <div>
        {message}
      </div>
      <h1>Pairs</h1>
      <div className="card">
        Add number between 1 at {max} :
        <button disabled={max < numbers.length} onClick={handleAddNumber}>
          Add
        </button>
        <p>
          {numbers.map((number, id) => <span key={id}>{number}, </span>)}
        </p>
      </div>

      <button onClick={handleCreatePairs}>
        Add
      </button>
      <p>
        {pairs.map((pair, id) => <>
          {pair.map((p, i) => <span key={i}>{p}, </span>)}
          <br />
        </>)}
      </p>
    </>
  )
}

export default App
