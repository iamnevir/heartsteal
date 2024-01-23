import Model from "@/components/models/model";

const ModelPage = ({ params }: { params: { modelId: string } }) => {
  return (
    <>
      <Model modelId={params.modelId} />
    </>
  );
};

export default ModelPage;
