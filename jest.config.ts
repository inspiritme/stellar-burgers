// jest.config.js

module.exports = {
  // Среда выполнения тестов
  // 'jsdom' нужен для React, чтобы имитировать браузер
  testEnvironment: 'jsdom',

  // Расширения файлов, которые Jest будет понимать
  // ts, tsx — TypeScript
  // js, jsx — JavaScript
  // json — для импорта json файлов
  // node — для node модулей
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  verbose:true,

  // Трансформация файлов через ts-jest
  // '^.+\\.tsx?$' — все файлы .ts и .tsx
  // Можно использовать '^.+\\.[tj]sx?$' если есть .js/.jsx тоже
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest', // используем ts-jest для обработки TypeScript
      {
        // настройки для ts-jest можно оставить пустыми
        // например, можно добавить isolatedModules: true
        // или любые другие опции ts-jest
      },
    ],
  },

  // Алиасы из tsconfig.json для Jest
  // Чтобы Jest понимал импорты вида @slices, @store, @api и т.д.
  moduleNameMapper: {
  '^@slices/(.*)$': '<rootDir>/src/services/slices/$1',      // отдельные файлы
  '^@slices$': '<rootDir>/src/services/slices/index.ts',     // папка / индексный файл
  '^@pages/(.*)$': '<rootDir>/src/pages/$1',
  '^@components/(.*)$': '<rootDir>/src/components/$1',
  '^@ui/(.*)$': '<rootDir>/src/components/ui/$1',
  '^@ui-pages/(.*)$': '<rootDir>/src/components/ui/pages/$1',
  '^@utils-types/(.*)$': '<rootDir>/src/utils/types/$1',
  '^@api$': '<rootDir>/src/utils/burger-api.ts',
  '^@store$': '<rootDir>/src/services/store.ts',
  '^@selectors/(.*)$': '<rootDir>/src/services/selectors/$1',
},
};