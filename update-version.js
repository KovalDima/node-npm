import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Отримання еквівалента __dirname для ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packagePath = path.resolve(__dirname, 'package.json');
const versionFilePath = path.resolve(__dirname, 'version.json');

const updateVersionFile = () => {
    try {
        // 1. Читаємо package.json як текстовий рядок (СИНХРОННО)
        const packageContent = fs.readFileSync(packagePath, 'utf8');

        // 2. Парсимо вміст в об'єкт
        const packageJson = JSON.parse(packageContent);
        const newVersion = packageJson.version;

        // 3. Створюємо вміст для version.json
        const versionData = {
            version: newVersion,
            timestamp: new Date().toISOString()
        };

        // 4. Записуємо оновлений JSON у файл
        fs.writeFileSync(versionFilePath, JSON.stringify(versionData, null, 2), 'utf8');

        console.log(`✅ Версія ${newVersion} успішно записана у ${path.basename(versionFilePath)}`);
    } catch (error) {
        console.error("Помилка оновлення файлу версії:", error.message);
        // Додаємо вивід стеку помилок для діагностики, якщо щось піде не так
        // console.error(error);
        process.exit(1);
    }
}

updateVersionFile();