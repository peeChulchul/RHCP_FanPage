import App from "App";
import Layout from "page/layout/view";
import PageMember from "page/member/view";
import { createBrowserRouter } from "react-router-dom";

export const fanPageRoute = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/member/",
        element: <PageMember />,
        children: [
          {
            path: ":name",
            element: null
          },
          {
            path: ":name/:letterId",
            element: <>편지다</>
          }
        ]
      },
      { path: "/music", element: <>music</> }
    ]
  }
]);
