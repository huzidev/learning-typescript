import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"
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
        <ul>
            {
                user.users.map((user: any) => (
                    <li key={user.id}>
                        {user.name}
                    </li>
                ))
            }
        </ul>
    </div>
  )
}