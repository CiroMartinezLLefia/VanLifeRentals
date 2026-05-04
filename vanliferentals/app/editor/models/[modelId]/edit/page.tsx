type EditModelPageProps = {
  params: {
    modelId: string;
  };
};

export default function EditModelPage({ params }: EditModelPageProps) {
  return (
    <main>
      <h1>Edit Model</h1>
      <p>Placeholder for model edit form.</p>
      <p>Model id: {params.modelId}</p>
    </main>
  );
}
