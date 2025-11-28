import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./counterSlice.js";
export default function Counter() {
  const value = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <>
      <h2>Counter = {value} </h2>
      <div>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
      </div>
      <p>{value}</p>
    </>
  );
}
