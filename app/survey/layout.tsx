import clsx from 'clsx';
// Components
import Provider from '@/components/survey/Provider';
import SurveySidebar from '@/components/survey/Sidebar';

export default function SurveyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
          <div className="lg:bg-white w-full flex flex-col lg:flex-row px-4 lg:p-4 rounded-2xl lg:shadow-lg">
            <SurveySidebar />
            <Provider>{children}</Provider>
          </div>
  );
}
