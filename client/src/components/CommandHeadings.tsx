type CommandHeadingsProps = {
  name: string;
  description?: string;
  longDescription?: string;
};

const CommandHeadings = ({
  name,
  description,
  longDescription,
}: CommandHeadingsProps) => {
  return (
    <>
      <h1 class="text-4xl mb-4 text-white">{name}</h1>
      <h4 class="text-lg mb-8 text-white">{description}</h4>
      <h4 class="text-lg mb-8 text-white">{longDescription}</h4>
    </>
  );
};

export default CommandHeadings;
