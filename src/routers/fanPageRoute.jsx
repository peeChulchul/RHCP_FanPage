import Layout from "page/layout/view";
import PageMember from "page/member/view";
import LetterDetailPage from "page/member/view/letter-detail-page";
import { createBrowserRouter } from "react-router-dom";
import { ReduxProvider } from "redux/config/config-store";

export const fanPageRoute = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/member/",
        element: (
          <ReduxProvider>
            <PageMember />
          </ReduxProvider>
        ),
        children: [
          {
            path: ":name",
            element: null
          },
          {
            path: ":name/:letterId",
            element: <LetterDetailPage />
          }
        ]
      },
      { path: "/music", element: <>music</> }
    ]
  }
]);
