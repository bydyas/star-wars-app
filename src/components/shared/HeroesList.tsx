import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";

import { swapiService } from "../../services/swapi.service";
import { HeroCard } from "../ui/HeroCard";

export const HeroesList = () => {
  const [page, setPage] = useState<number>(1);
  const [heroes, setHeroes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const observer = useRef<IntersectionObserver>();
  const [isLimit, setIsLimit] = useState<boolean>(false);

  const fetchMoreHeroes = () => {
    setLoading(true);
    swapiService
      .getHeroes(page)
      .then((data) => {
        if (!data?.next) {
          setIsLimit(true);
        }
        const newHeroes = data?.results!;
        setHeroes((prevHeroes) => [...prevHeroes, ...newHeroes]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMoreHeroes();
  }, [page]);

  const lastHeroRef = useCallback(
    (node: any) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !isLimit) {
          setPage((prevPage) => ++prevPage);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading]
  );

  return (
    <>
      <ul className="w-60 flex gap-2 flex-col mx-auto">
        {heroes.map((hero, index) => (
          <li
            key={`${hero.id}-${index}`}
            ref={heroes.length === index + 1 ? lastHeroRef : null}
          >
            <Link to="/heroes/$id" params={{ id: hero.id }}>
              <HeroCard name={hero.name} id={hero.id} />
            </Link>
          </li>
        ))}
      </ul>
      {loading && (
        <p className="text-yellow-400 text-4xl font-bold max-w-64 mx-auto">
          A long time ago in a galaxy far, far away....
        </p>
      )}
    </>
  );
};
