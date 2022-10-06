import { PropsWithChildren } from "react";
import Header from "../../uikit/Header/Header";

interface PageContainerProps {
  title: string;
}

const PageContainer = ({
  title,
  children,
}: PropsWithChildren<PageContainerProps>) => {
  return (
    <>
      <Header />
      <div className="py-10">
        <header>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
              {title}
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </>
  );
};

export default PageContainer;
