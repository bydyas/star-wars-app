interface Props {
  name: string;
  id: string;
}

export const HeroCard = ({ name, id }: Props) => {
  return (
    <figure className="flex gap-3 items-center border-t-yellow-400 border rounded-lg px-6 py-4 cursor-pointer hover:bg-yellow-50 transition-all hover:skew-y-3">
      <img
        className="size-16"
        src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
        alt={name}
      />
      <figcaption className="text-yellow-400">{name}</figcaption>
    </figure>
  );
};
