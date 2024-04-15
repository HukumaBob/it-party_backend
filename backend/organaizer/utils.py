import json
import qrcode
from django.conf import settings
from pathlib import Path


def questionnaire_in_qr_code(questionnaire_json):
    questionnaire = json.dumps(questionnaire_json)
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(questionnaire)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")

    # Сохраняем QR-код как изображение
    img_filename = (
        f'user_event_{questionnaire_json["application_number"]}_qr.png'
        )
    media_root = Path(settings.MEDIA_ROOT)
    img_path = media_root / 'tickets' / img_filename
    img.save(str(img_path))

    return img_filename
