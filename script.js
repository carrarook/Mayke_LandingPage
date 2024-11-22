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

// Adiciona evento de rolagem para destacar seções
document.addEventListener('scroll', () => {
    const highlights = document.querySelectorAll('.highlight');
    const sections = document.querySelectorAll('.section');
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop - sectionHeight / 3) {
            currentSection = section.getAttribute('id');
        }
    });

    highlights.forEach(highlight => {
        highlight.classList.remove('active');
        if (highlight.dataset.section === currentSection) {
            highlight.classList.add('active');
        }
    });
});


document.addEventListener("DOMContentLoaded", () => {
  const stateSelect = document.getElementById("state");
  const citySelect = document.getElementById("city");

  // Preencher estados
  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then(response => response.json())
      .then(data => {
          const sortedStates = data.sort((a, b) => a.nome.localeCompare(b.nome));
          sortedStates.forEach(state => {
              const option = document.createElement("option");
              option.value = state.sigla;
              option.textContent = state.nome;
              stateSelect.appendChild(option);
          });
      })
      .catch(error => console.error("Erro ao carregar os estados:", error));

  // Atualizar cidades com base no estado selecionado
  stateSelect.addEventListener("change", () => {
      const selectedState = stateSelect.value;
      citySelect.innerHTML = '<option value="" disabled selected>Selecione a cidade</option>';

      if (selectedState) {
          fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState}/municipios`)
              .then(response => response.json())
              .then(data => {
                  data.forEach(city => {
                      const option = document.createElement("option");
                      option.value = city.nome;
                      option.textContent = city.nome;
                      citySelect.appendChild(option);
                  });
              })
              .catch(error => console.error("Erro ao carregar as cidades:", error));
      }
  });
});



document.getElementById("contact-form").addEventListener("submit", function (event) {
  event.preventDefault(); // Impede o envio normal do formulário

  const form = this;

  // Enviar os dados do formulário usando Fetch API
  fetch(form.action, {
      method: "POST",
      body: new FormData(form),
  })
      .then((response) => {
          if (response.ok) {
              // Exibe o alerta de sucesso
              Swal.fire({
                  icon: "success",
                  title: "Mensagem enviada!",
                  text: "Entraremos em contato em breve.",
                  confirmButtonColor: "#00c738",
              });

              // Limpa o formulário após o envio
              form.reset();
          } else {
              // Exibe o alerta de erro
              Swal.fire({
                  icon: "error",
                  title: "Erro ao enviar!",
                  text: "Por favor, tente novamente mais tarde.",
                  confirmButtonColor: "#ff6b00",
              });
          }
      })
      .catch((error) => {
          console.error("Erro:", error);
          Swal.fire({
              icon: "error",
              title: "Erro ao enviar!",
              text: "Por favor, verifique sua conexão.",
              confirmButtonColor: "#ff6b00",
          });
      });
});


// Bloqueio de rolagem enquanto o popup está ativo
document.addEventListener("DOMContentLoaded", () => {
  const popup = document.querySelector(".popup");
  const body = document.body;

  // Bloqueia a rolagem
  body.classList.add("no-scroll");

  // Fecha o popup e habilita rolagem ao clicar no botão
  document.querySelector(".close-popup").addEventListener("click", () => {
    popup.style.display = "none";
    body.classList.remove("no-scroll");
  });

  // Redireciona ao clicar em "Sair"
  document.querySelector(".exit-popup").addEventListener("click", () => {
    window.location.href = "https://google.com";
  });
});
