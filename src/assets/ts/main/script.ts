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

// ===================== Выравнивание высоты блоков ====================== //

function equalizeCardContentHeights(containerSelector: string = ".row", cardContentSelector: string = ".card-content"): void {
  const rows = document.querySelectorAll(containerSelector);

  rows.forEach((row) => {
    const contents = Array.from(row.querySelectorAll(cardContentSelector)) as HTMLElement[];

    if (contents.length === 0) return;

    // Сброс высоты, чтобы корректно измерить естественную высоту
    contents.forEach((el) => {
      el.style.height = "";
    });

    // Группировка по строкам (на основе top)
    const groups: HTMLElement[][] = [];
    let currentGroup: HTMLElement[] = [];
    let lastTop = -1;

    contents.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const top = Math.round(rect.top);

      if (top !== lastTop) {
        if (currentGroup.length) {
          groups.push(currentGroup);
        }
        currentGroup = [el];
        lastTop = top;
      } else {
        currentGroup.push(el);
      }
    });

    if (currentGroup.length) {
      groups.push(currentGroup);
    }

    // Установка максимальной высоты в каждой группе
    groups.forEach((group) => {
      const maxHeight = Math.max(...group.map((el) => el.offsetHeight));
      group.forEach((el) => {
        el.style.height = `${maxHeight}px`;
      });
    });
  });
}

// Запуск после загрузки и при изменении размера окна
window.addEventListener("load", () => equalizeCardContentHeights());
window.addEventListener("resize", () => {
  clearTimeout((window as any).resizeTimeout);
  (window as any).resizeTimeout = setTimeout(() => equalizeCardContentHeights(), 150);
});
