import App from "App";
import { MemberContextProvider } from "context/member-context";
import Layout from "page/layout/view";
import PageMember from "page/member/view";
import LetterDetailPage from "page/member/view/letter-detail-page";
import { createBrowserRouter } from "react-router-dom";

export const fanPageRoute = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/member/",
        element: (
          <MemberContextProvider>
            <PageMember />
          </MemberContextProvider>
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
