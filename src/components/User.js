
import { useSelector } from 'react-redux';

function User() {
  const myUsername = useSelector(state => state.username);
  const users = useSelector(state => state.users);


  // useEffect(() => {
  //   fetch()
  // }, [])

  return(
    <div>



    </div>
  )

}

