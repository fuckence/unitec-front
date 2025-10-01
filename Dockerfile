FROM node:20

WORKDIR /app

# Копируем зависимости
COPY package*.json ./
RUN npm install

# Копируем код
COPY . .

# Открываем порт Vite dev
EXPOSE 5174

# Запуск Vite dev-сервера
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
