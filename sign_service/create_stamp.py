import PyPDF2 as pypdf
from PyPDF2.generic import RectangleObject
import time


def create_stamp(input_path, stamp_path="assets/stamp.pdf"):
    image_reader = pypdf.PdfReader(stamp_path)
    image_page = image_reader.pages[0]

    content_reader = pypdf.PdfReader(input_path)
    content_page = content_reader.pages[-1]
    mediabox = content_page.mediabox

    content_page.merge_page(image_page)
    content_page.mediabox = mediabox

    writer = pypdf.PdfWriter()

    for page_num in range(len(content_reader.pages) - 1):
        page = content_reader.pages[page_num]
        writer.add_page(page)

    writer.add_page(content_page)

    with open(input_path, "wb") as fp:
        writer.write(fp)

    print(f"Штамп успешно добавлен. Сохранено в {input_path}")


if __name__ == "__main__":
    create_stamp("assets/2.pdf",
                 "assets/stamp.pdf")

