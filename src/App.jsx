import Signin from "./Components/Signin";
import { UserAuth } from "./Components/AuthContext";

function App() {
  const { user } = UserAuth();

  // console.log(user);

  return (
    <>
      <Signin />
    </>
  );
}

export default App;
