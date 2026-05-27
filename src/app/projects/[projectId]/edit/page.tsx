import { Metadata } from "next";
import { Suspense } from "react";
import { invoke } from "src/app/blitz-server";
import getProject from "../../queries/getProject";
import { EditProject } from "../../components/EditProject";

type EditProjectPageProps = {
  params: Promise<{ projectId: string }>;
};

export async function generateMetadata(
  props: EditProjectPageProps
): Promise<Metadata> {
  const params = await props.params;
  const Project = await invoke(getProject, { id: Number(params.projectId) });
  return {
    title: `Edit Project ${Project.id} - ${Project.description}`,
  };
}

export default async function Page(props: EditProjectPageProps) {
  const params = await props.params;
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditProject projectId={Number(params.projectId)} />
      </Suspense>
    </div>
  );
}
