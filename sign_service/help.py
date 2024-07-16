import fitz  # PyMuPDF

def move_image_down(input_path, output_path, offset):
    # Открываем PDF-документ
    document = fitz.open(input_path)

    # Получаем первую страницу
    page = document[0]
        
    # Получаем первое изображение на странице
    image_list = page.get_images(full=True)
    if not image_list:
        print("Изображений не найдено на странице")
        return
    
    img = image_list[0]
    xref = img[0]
    image_rects = page.get_image_rects(xref)

    if not image_rects:
        print("Не удалось получить координаты изображения")
        return

    # Перемещаем изображение вниз
    rect = image_rects[0]
    new_rect = fitz.Rect(rect.x0, rect.y0 - offset, rect.x1, rect.y1 - offset)
    
    # Извлекаем изображение
    image_info = document.extract_image(xref)
    image_bytes = image_info["image"]
    
    # Удаляем старое изображение
    page.add_redact_annot(rect)
    page.apply_redactions(images=False)

    # Вставляем изображение в новых координатах
    page.insert_image(new_rect, stream=image_bytes)

    # Сохраняем измененный PDF
    document.save(output_path)
    document.close()

    print(f"Изображение успешно перемещено. Сохранено в {output_path}")

if __name__ == "__main__":
    move_image_down("assets/stamp.pdf",
                    "dist/output_with_moved_image.pdf",
                    100)  # Смещение вниз на 100 единиц
