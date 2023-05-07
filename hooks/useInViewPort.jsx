import { useEffect, useState } from "react";

const useInViewPort = (arrayOfRefs) => {
  console.log("started");
  const [inViewport, setInViewport] = useState({});
  const refsAreReady =
    arrayOfRefs.every((e) => e !== null) &&
    arrayOfRefs.every((e) => !!e.current);
  console.log(refsAreReady);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (
          !inViewport.hasOwnProperty(entry.target.id) &&
          inViewport[[entry.target.id]] !== true
        ) {
          console.log(entry.target.id);
          setInViewport({ [entry.target.id]: true });
        }
      }
    });

    if (refsAreReady) {
      arrayOfRefs.forEach((ref) => {
        observer.observe(ref.current);
      });
      return () => {
        console.log("stoped");
        arrayOfRefs.forEach((ref) => {
          observer.unobserve(ref.current);
        });
      };
    }
  }, [arrayOfRefs, refsAreReady, inViewport]);
  return inViewport;
};

export default useInViewPort;
