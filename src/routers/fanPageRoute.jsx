import PageHome from "page/home/view";
import Layout from "page/layout/view";
import PageMember from "page/member/view";
import LetterDetailPage from "page/member/view/letter-detail-page";
import PageMusic from "page/music/view";
import { createBrowserRouter } from "react-router-dom";
import { ReduxProvider } from "redux/config/config-store";

export const fanPageRoute = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <PageHome />
      },
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
      { path: "/music", element: <PageMusic />, children: [{}] }
    ]
  }
]);
