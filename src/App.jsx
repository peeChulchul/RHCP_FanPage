import { RouterProvider } from "react-router-dom";
import { ComponentsFanPageRoute, nestingFanPageRoute } from "routers";

function App() {
  // nesting방식 라우터
  // return <RouterProvider router={nestingFanPageRoute} />;

  // 컴포넌트방식 라우터
  return <ComponentsFanPageRoute />;
}

export default App;
