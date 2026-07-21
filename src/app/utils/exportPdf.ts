import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';

export const exportElementToPdf = async (
  elementId: string,
  filename = 'document.pdf',
) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  // 1. Сохраняем исходный белый фон самого контейнера
  const originalBg = element.style.backgroundColor;
  element.style.backgroundColor = '#ffffff';

  // 2. Находим все текстовые элементы внутри и делаем их черными
  const textElements = element.querySelectorAll<HTMLElement>('*');
  const originalColors = new Map<HTMLElement, string>();

  textElements.forEach((el) => {
    originalColors.set(el, el.style.color);
    el.style.color = '#000000';
  });

  try {
    // Даем браузеру перескрасить элементы
    await new Promise((resolve) => setTimeout(resolve, 50));

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.98);

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = pdfHeight;
    let position = 0;

    pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight);
    heightLeft -= pdf.internal.pageSize.getHeight();

    while (heightLeft >= 0) {
      position = heightLeft - pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();
    }

    pdf.save(filename);
  } catch (error) {
    console.error('Ошибка при генерации PDF:', error);
  } finally {
    // 3. Возвращаем всё как было на экране
    element.style.backgroundColor = originalBg;
    textElements.forEach((el) => {
      const origColor = originalColors.get(el);
      if (origColor !== undefined) {
        el.style.color = origColor;
      }
    });
  }
};
