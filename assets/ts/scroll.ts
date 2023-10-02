const scrollTargets = document.querySelectorAll("[data-scroll");

if (scrollTargets) {
  const viewportThreshold = window.innerHeight * 0.5;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.target instanceof HTMLElement) {
          const className = entry.target.dataset.scroll;

          if (className) {
            if (entry.intersectionRect.height >= viewportThreshold) {
              document.body.classList.forEach((cls) => {
                if (cls.indexOf("theme-") === 0) {
                  document.body.classList.remove(cls);
                }
              });

              document.body.classList.add(className);
            }
          }
        }
      });
    },
    { threshold: [0.1, 0.2, 0.3, 0.4, 0.5] }
  );

  scrollTargets.forEach((target) => {
    observer.observe(target);
  });
}
