import AUTH from "page/common/auth";
import PageHome from "page/home/view";
import Layout from "page/layout/view";
import { PageMember, PageMemberLetterDetail } from "page/member/view";
import { PageMusic, PageMusicDetail } from "page/music/view";
import { BrowserRouter, Route, Routes, createBrowserRouter } from "react-router-dom";
import { ReduxProvider } from "redux/config/config-store";

// nesting 라우터

export const nestingFanPageRoute = createBrowserRouter([
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

// 컴포넌트 라우터

export function ComponentsFanPageRoute() {
  return (
    <BrowserRouter>
      <ReduxProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<PageHome />} />
            <Route
              path="/test"
              element={
                <>
                  <AUTH />
                </>
              }
            />

            <Route path={"/Member"} element={<PageMember />}>
              <Route path={":name"} element={null} />
              <Route path={":name/:letterId"} element={<PageMemberLetterDetail />} />
            </Route>
            <Route path={"Music"} element={<PageMusic />}>
              <Route path={":albumName"} element={<PageMusicDetail />} />
            </Route>
          </Routes>
        </Layout>
      </ReduxProvider>
    </BrowserRouter>
  );
}
