import { useDispatch } from "react-redux"

export default function App(): JSX.Element {
  const dispatch = useDispatch();
  function onLoad() {
  }

  return (
    <div>
        <h1>
            Redux Thunk
        </h1>
        <button>
            Fetch Data
        </button>
    </div>
  )
}