import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../Store/userSlice";

export default function App(): JSX.Element {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user)
  useEffect(() => {
      dispatch(fetchUsers())  
  }, [])

  return (
    <div>
        <h1>
            Redux Thunk
        </h1>
        <h2>
            List of users
        </h2>
        {user.loading && <h1>Loading...</h1>}
        {!user.loading && user.error ? <h1>Error: {user.error}</h1> : null}
        {!user.loading && user.users.length ? (
            <ul>
                {
                    user.users.map((user: any) => {
                        <li key={user.id}>
                            {user.name}
                        </li>
                    })
                }
            </ul>
        ): null}
    </div>
  )
}