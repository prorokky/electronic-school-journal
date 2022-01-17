"use strict";

module.exports = {
    // Описание на русском языке ко всем типам
    types: [
        {
            value: "build",
            name: "build:     Сборка проекта или изменения внешних зависимостей"
        },
        { value: "ci", name: "ci:        Настройка CI и работа со скриптами" },
        { value: "docs", name: "docs:      Обновление документации" },
        { value: "feat", name: "feat:      Добавление нового функционала" },
        { value: "fix", name: "fix:       Исправление ошибок" },
        {
            value: "perf",
            name: "perf:      Изменения направленные на улучшение производительности"
        },
        {
            value: "refactor",
            name:
                "refactor:  Правки кода без исправления ошибок или добавления новых функций"
        },
        { value: "revert", name: "revert:    Откат на предыдущие коммиты" },
        {
            value: "style",
            name:
                "style:     Правки по кодстайлу (табы, отступы, точки, запятые и т.д.)"
        },
        { value: "test", name: "test:      Добавление тестов" }
    ],

    // Область. Характеризует фрагмент кода, которую затронули изменения
    scopes: [
        { name: "components" },
        { name: "tutorial" },
        { name: "catalog" },
        { name: "product" }
    ],

    messages: {
        type: "Какие изменения вы вносите?",
        scope: "\nВыберите ОБЛАСТЬ, которую вы изменили (опционально):",
        // Спросим если allowCustomScopes в true
        customScope: "Укажите свою ОБЛАСТЬ:",
        subject: "Короткое описание:\n",
        body:
            'Подробное описание (опционально). "|" для новой строки:\n',
        breaking: "Список BREAKING CHANGES (опционально):\n",
        footer:
            "Место для мета данных (тикетов, ссылок и остального):\n",
        confirmCommit: "Вас устраивает получившийся коммит?"
    },

    // Разрешим собственную ОБЛАСТЬ
    allowCustomScopes: true,

    // Запрет на Breaking Changes
    allowBreakingChanges: false,

    // Префикс для нижнего колонтитула
    footerPrefix: "МЕТА ДАННЫЕ:",

    // limit subject length
    subjectLimit: 72
}