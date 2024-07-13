import os

# Получаем текущий путь к директории
directory = os.getcwd()

# Получаем список всех файлов в текущей директории
files = os.listdir(directory)

# Фильтруем только файлы с расширением .jpg
jpg_files = [file for file in files if file.lower().endswith('.jpg')]

# Переименовываем файлы
for i, jpg_file in enumerate(jpg_files, start=1):
    new_name = f'speaker-{i:02d}.jpg'
    os.rename(os.path.join(directory, jpg_file), os.path.join(directory, new_name))
    print(f'Renamed {jpg_file} to {new_name}')

print('Готово!')

