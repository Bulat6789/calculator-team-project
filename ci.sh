#!/bin/bash

# CI скрипт для калькулятора
# Выполняет: загрузку, сборку, тестирование, создание установщика и установку
#
# Использование:
#   ./ci.sh [ветка]
#   ./ci.sh master  (по умолчанию)
#   ./ci.sh feat/trigonometry

set -e  # Остановка при ошибке

# Определение ветки (по умолчанию master)
BRANCH=${1:-master}

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Функция для вывода сообщений
info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Проверка, что мы в git репозитории
if [ ! -d ".git" ]; then
    error "Текущая директория не является git репозиторием"
fi

info "=========================================="
info "CI скрипт для калькулятора"
info "=========================================="
echo ""

# Шаг 1: Загрузка актуального состояния с сервера
info "Шаг 1: Загрузка актуального состояния с сервера (ветка: $BRANCH)..."
if git fetch origin; then
    info "✓ Изменения загружены с сервера"
else
    error "Не удалось загрузить изменения с сервера"
fi

# Переключение на нужную ветку
if git checkout "$BRANCH" 2>/dev/null || git checkout -b "$BRANCH" "origin/$BRANCH" 2>/dev/null; then
    info "✓ Переключено на ветку: $BRANCH"
    git pull origin "$BRANCH" || warning "Не удалось сделать pull, возможно ветка локальная"
else
    error "Не удалось переключиться на ветку: $BRANCH"
fi
echo ""

# Шаг 2: Установка зависимостей и подготовка к сборке
info "Шаг 2: Установка зависимостей проекта..."
if command -v npm &> /dev/null; then
    if npm install; then
        info "✓ Зависимости установлены"
    else
        error "Не удалось установить зависимости"
    fi
else
    error "npm не найден. Установите Node.js"
fi
echo ""

# Шаг 3: Выполнение unit тестов
info "Шаг 3: Выполнение unit тестов..."
if npm test; then
    info "✓ Все тесты прошли успешно"
else
    error "Тесты не прошли. Сборка прервана"
fi
echo ""

# Шаг 4: Проверка наличия инструментов для сборки DEB
info "Шаг 4: Проверка инструментов для сборки DEB пакета..."
if ! command -v dpkg-buildpackage &> /dev/null; then
    warning "dpkg-buildpackage не найден. Попытка установки..."
    if command -v apt-get &> /dev/null; then
        sudo apt-get update
        sudo apt-get install -y debhelper build-essential
    else
        error "Не удалось установить инструменты для сборки DEB"
    fi
fi
info "✓ Инструменты для сборки готовы"
echo ""

# Шаг 5: Создание установщика (DEB пакет)
info "Шаг 5: Создание DEB пакета..."
PROJECT_DIR="$(pwd)"
PARENT_DIR="$(dirname "$PROJECT_DIR")"

# Переходим в родительскую директорию для сборки
cd "$PARENT_DIR"

# Очистка старых пакетов (опционально)
if ls calculator_*.deb 1> /dev/null 2>&1; then
    info "Удаление старых DEB пакетов..."
    rm -f calculator_*.deb calculator_*.changes calculator_*.buildinfo calculator_*.dsc calculator_*.tar.gz
fi

# Сборка пакета (из директории проекта)
cd "$PROJECT_DIR"
if dpkg-buildpackage -us -uc -b; then
    info "✓ DEB пакет успешно создан"
    
    # Поиск созданного пакета в родительской директории
    cd "$PARENT_DIR"
    DEB_FILE=$(ls calculator_*.deb 2>/dev/null | head -n 1)
    if [ -z "$DEB_FILE" ]; then
        error "DEB файл не найден после сборки"
    fi
    DEB_FILE="$PARENT_DIR/$DEB_FILE"
    info "Создан пакет: $DEB_FILE"
else
    error "Не удалось собрать DEB пакет"
fi

cd "$PROJECT_DIR"
echo ""

# Шаг 6: Установка приложения
info "Шаг 6: Установка приложения..."

if [ -f "$DEB_FILE" ]; then
    info "Установка пакета: $DEB_FILE"
    
    # Удаление старой версии, если установлена
    if dpkg -l | grep -q "^ii.*calculator"; then
        info "Удаление старой версии..."
        sudo dpkg -r calculator 2>/dev/null || true
    fi
    
    # Установка нового пакета
    if sudo dpkg -i "$DEB_FILE"; then
        # Установка зависимостей, если нужно
        if sudo apt-get install -f -y; then
            info "✓ Приложение успешно установлено"
        else
            warning "Пакет установлен, но могут быть проблемы с зависимостями"
        fi
    else
        error "Не удалось установить пакет"
    fi
else
    error "DEB файл не найден: $DEB_FILE"
fi
echo ""

# Финальный отчет
info "=========================================="
info "CI процесс завершен успешно!"
info "=========================================="
info "Пакет установлен. Запустите калькулятор командой: calculator"
info "Или найдите его в меню приложений"

