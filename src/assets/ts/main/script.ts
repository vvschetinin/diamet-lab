export {};

// ======================= Header Scroll Bottom ============================= //

const defaultOffset: number = 40;
const header: HTMLElement | null = document.querySelector(".header");

const scrollPosition = (): number => window.pageYOffset || document.documentElement.scrollTop;

// Функция для инициализации состояния header
const initializeHeader = (): void => {
  if (header) {
    if (scrollPosition() <= defaultOffset) {
      header.classList.remove("is-active");
    } else {
      header.classList.add("is-active");
    }
  }
};

// Вызываем инициализацию при загрузке страницы
document.addEventListener("DOMContentLoaded", initializeHeader);

// Обработчик прокрутки
window.addEventListener("scroll", (): void => {
  if (header) {
    const currentScroll = scrollPosition();
    if (currentScroll > defaultOffset) {
      header.classList.add("is-active");
    } else {
      header.classList.remove("is-active");
    }
  }
});

// ============== Вызов формы ================= //

const startProjectForm = document.querySelector<HTMLElement>(".start-project-overlay");
const startProjectButtons = document.querySelectorAll<HTMLElement>(".js-startcontact");
const closeButton = document.querySelector<HTMLElement>(".js-closebutton");

if (startProjectForm) {
  startProjectButtons.forEach((el: HTMLElement) => {
    el.addEventListener("click", () => {
      startProjectForm.classList.add("is-active");
    });
  });

  closeButton?.addEventListener("click", () => {
    startProjectForm.classList.remove("is-active");
  });
}

// ================ Checked Form ================ //

// Используем типы HTMLElement или их подтипы (например, HTMLInputElement)
const formButton = document.querySelector('[name="formbutton"]') as HTMLButtonElement | null;
const formCheck = document.querySelector('[name="formcheck"]') as HTMLInputElement | null;

if (formButton && formCheck) {
  formButton.setAttribute("disabled", "true");

  formCheck.oninput = () => {
    if (formCheck.checked) {
      formButton.removeAttribute("disabled");
    } else {
      formButton.setAttribute("disabled", "true");
    }
  };
} else {
  console.error("Один из элементов формы не найден");
}

// ====================== Изменение заголовка формы ======================== //

const contactButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll(".js-startcontact");

const formTitle: HTMLHeadingElement | null = document.querySelector(".h1-inner");

const subjectInput: HTMLInputElement | null = document.querySelector('input[name="subject"]');

if (contactButtons.length > 0 && formTitle && subjectInput) {
  contactButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const buttonText = button.textContent?.trim();

      if (buttonText) {
        formTitle.textContent = buttonText;

        subjectInput.value = buttonText;
      }
    });
  });
} else {
  console.warn("Не удалось найти один или несколько элементов");
}

// Указание на защиту авторских прав

// Ищем элемент внутри .footer-copyright — первый span, где нужно заменить год
const footer = document.querySelector(".footer-copyright");

if (footer) {
  const yearSpan = footer.querySelector("span");

  if (yearSpan) {
    const startYear = 2005;
    const currentYear = new Date().getFullYear();
    const copyrightText = `${startYear}–${currentYear}`;
    yearSpan.textContent = copyrightText;
  }
}

// ===================================

// faq.ts

document.addEventListener("DOMContentLoaded", () => {
  const faqList = document.querySelector(".faq-list");
  if (!faqList) {
    console.error('FAQ list not found. Make sure an element with class "faq-list" exists.');
    return;
  }

  const faqItems = Array.from(faqList.querySelectorAll("li"));

  function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function displayRandomFaqItems(count: number = 5) {
    faqList!.innerHTML = "";
    const shuffledItems = shuffleArray([...faqItems]);
    const itemsToDisplay = shuffledItems.slice(0, count);

    itemsToDisplay.forEach((item) => {
      const clonedItem = item.cloneNode(true) as HTMLLIElement;
      faqList!.appendChild(clonedItem);

      const questionElement = clonedItem.querySelector(".faq-question") as HTMLElement;
      const answerElement = clonedItem.querySelector(".faq-answer") as HTMLElement;
      const answerContent = answerElement?.querySelector("p"); // Находим внутренний параграф для контента

      if (questionElement && answerElement && answerContent) {
        // Изначально скрываем все ответы и устанавливаем высоту в 0
        answerElement.style.maxHeight = "0";
        answerElement.style.overflow = "hidden";
        answerElement.style.transition = "max-height 0.3s ease-out"; // Только max-height
        // Отступы теперь будут на внутреннем элементе, а не на answerElement
        clonedItem.classList.remove("active");

        const toggleIcon = document.createElement("span");
        toggleIcon.classList.add("faq-toggle-icon");
        toggleIcon.textContent = "+";

        questionElement.appendChild(toggleIcon);

        questionElement.addEventListener("click", () => {
          const isActive = clonedItem.classList.contains("active");

          if (isActive) {
            // Скрываем ответ
            answerElement.style.maxHeight = "0";
            clonedItem.classList.remove("active");
            toggleIcon.textContent = "+";
          } else {
            // Показываем ответ
            // Устанавливаем max-height на фактическую высоту контента, включая padding внутреннего элемента.
            // offsetHeight учитывает border и padding.
            // Если padding применяется к самому .faq-answer, то scrollHeight может быть меньше
            // фактической высоты, которая получается с padding.
            // Поэтому лучше, чтобы padding был на внутреннем элементе (p).
            answerElement.style.maxHeight = answerContent.offsetHeight + "px"; // Используем offsetHeight внутреннего контента
            clonedItem.classList.add("active");
            toggleIcon.textContent = "-";
          }
          // Удаляем ontransitionend, так как мы не сбрасываем max-height в 'none'
        });
      }
    });
  }

  displayRandomFaqItems();
});

// ===============================
