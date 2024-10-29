
  let currentIndex = 0;

  function moveCarousel(direction) {
    const track = document.querySelector(".carousel-track");
    const totalItems = track.children.length;

    // Atualiza o índice
    currentIndex += direction;

    // Limita o índice para evitar excesso de deslocamento
    if (currentIndex < 0) {
      currentIndex = totalItems - 1;
    } else if (currentIndex >= totalItems) {
      currentIndex = 0;
    }

    // Move o carrossel
    const slideWidth = track.children[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

