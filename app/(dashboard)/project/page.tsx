import ProjectPageView from "./page-view";

interface DashboardProps {
  params: {
    lang: any;
  };
}

const ProjectPage = async ({ params: { lang } }: DashboardProps) => {
  return <ProjectPageView />;
};

export default ProjectPage;
