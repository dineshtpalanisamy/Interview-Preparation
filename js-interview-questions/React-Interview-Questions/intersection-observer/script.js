const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("show", entry.isIntersecting);
      // if (entry.isIntersecting) {
      //   observer.unobserve(entry.target); // stops animation once done
      // }
    });
  },
  {
    // threshold: 1, // animation starts only when element is fully visible or while disapperaing
    threshold: 0.5, //defaukt 0
    rootMargin: "100px", // preload images when the container comes like close to the image
    // which want to be loaded , it preloads when the user scrolls near 100px to the image
    // root:  // actual conatiner
  }
);

const lastCardObserver = new IntersectionObserver(
  (entries) => {
    const lastCard = entries[0];
    if (!lastCard.isIntersecting) return;
    loadnewCards();
    lastCardObserver.unobserve(lastCard.target);
    lastCardObserver.observe(document.querySelector(".card:last-child"));
  },
  {
    rootMargin: "100px", // when scrolling before 100 pixels it loads the image
  }
);

lastCardObserver.observe(document.querySelector(".card:last-child"));
cards.forEach((card) => observer.observe(card));

const cardContainer = document.querySelector(".card-container");

function loadnewCards() {
  for (let i = 0; i < 10; i++) {
    const card = document.createElement("div");
    card.textContent = "New Card";
    card.classList.add("card");
    observer.observe(card); // first observer
    cardContainer.append(card);
  }
}
