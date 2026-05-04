type ModelDetailPageProps = {
  params: {
    modelId: string;
  };
};

export default function ModelDetailPage({
  params,
}: ModelDetailPageProps) {
  return (
    <main>
      <h1>Model Detail</h1>
      <p>Placeholder for model detail and comments.</p>
      <p>Model id: {params.modelId}</p>
    </main>
  );
}
