import locale
from datetime import datetime

date_formats = []
for lang in locale.locale_alias.keys():
    try:
        lang_date = datetime.now().strftime('%x').replace(str(datetime.now().year), '').replace('  ', ' ')
        locale.setlocale(locale.LC_TIME, lang)
        date_formats.append((lang, datetime.now().strftime('%x').replace(str(datetime.now().year), '').replace('  ', ' ')))
    except:
        pass

with open('date_formats.txt', 'w') as f:
    f.write(str(date_formats) + '\n')
print(date_formats)

