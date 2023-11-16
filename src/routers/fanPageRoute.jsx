import PageHome from "page/home/view";
import Layout from "page/layout/view";
import { PageMember, PageMemberLetterDetail } from "page/member/view";
import { PageMusic, PageMusicDetail } from "page/music/view";
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
        path: "/Member/",
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
            element: <PageMemberLetterDetail />
          }
        ]
      },
      {
        path: "/Music",
        element: <PageMusic />,
        children: [
          {
            path: ":albumName",
            element: <PageMusicDetail />
          }
        ]
      }
    ]
  }
]);
