import { TConstructorIngredient } from '@utils-types';
import { configureStore } from '@reduxjs/toolkit';
import {
  constructorReducer,
  constructorInitialState as initState,
  addBun,
  addIngredient,
  removeIngredient,
  burgerOrder
} from './constructorSlice';

jest.mock('@api', () => ({
  orderBurgerApi: jest.fn()
}));
import { orderBurgerApi } from '@api';

const mockBun: TConstructorIngredient = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  id: 'mockBunId'
};
const mockBun2: TConstructorIngredient = {
  _id: '643d69a5c3f7b9001cfa093d',
  name: 'Флюоресцентная булка R2-D3',
  type: 'bun',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
  id: 'mockBunId2'
};
const mockIngredient: TConstructorIngredient = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  id: 'mockMainId'
};
const mockIngredient2 = {
  _id: '643d69a5c3f7b9001cfa0944',
  name: 'Соус традиционный галактический',
  type: 'sauce',
  proteins: 42,
  fat: 24,
  carbohydrates: 42,
  calories: 99,
  price: 15,
  image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png',
  id: 'mockSauceId'
};
const mockIngredient3 = {
  _id: '643d69a5c3f7b9001cfa0947',
  name: 'Плоды Фалленианского дерева',
  type: 'main',
  proteins: 20,
  fat: 5,
  carbohydrates: 55,
  calories: 77,
  price: 874,
  image: 'https://code.s3.yandex.net/react/code/sp_1.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png',
  id: 'mockMainId2'
};

const fulfilledResponse = {
  success: true,
  name: 'Краторный бургер',
  order: {
    _id: 'order-1',
    number: 2241,
    status: 'done',
    name: 'Краторный бургер',
    owner: {
      name: 'Test User',
      email: 'test@mail.com',
      createdAt: '2026-03-28T00:00:00.000Z',
      updatedAt: '2026-03-28T00:00:00.000Z'
    },
    createdAt: '2026-03-28T00:00:00.000Z',
    updatedAt: '2026-03-28T00:00:00.000Z',
    price: 1200
  }
};

const mockResponse = {
  success: true,
  name: 'Краторный бургер',
  order: {
    number: 1111
  }
};

describe('тестируем constructorReducer', () => {
  test('добавление булки', () => {
    const state = constructorReducer(initState, addBun(mockBun));
    expect(state.constructorItems.bun).toEqual(mockBun);
  });
  test('добавление двух булок', () => {
    const state = constructorReducer(initState, addBun(mockBun));
    const state2 = constructorReducer(state, addBun(mockBun2));
    expect(state2.constructorItems.bun).toEqual(mockBun2);
    expect(state2.constructorItems.bun).not.toBeNull(); // булка не стёрлась
  });
  test('добавление ингредиента в бургер конструктор', () => {
    const state = constructorReducer(initState, addIngredient(mockIngredient));
    expect(state.constructorItems.ingredients).toContainEqual(mockIngredient);
    expect(state.constructorItems.ingredients).toHaveLength(1);
    const state2 = constructorReducer(state, addIngredient(mockIngredient));
    expect(state2.constructorItems.ingredients).toHaveLength(2);
  });
  test('удаление ингредиента из бургер конструктора', () => {
    const state = constructorReducer(initState, addIngredient(mockIngredient));
    const state2 = constructorReducer(state, addIngredient(mockIngredient2));
    const state3 = constructorReducer(
      state2,
      removeIngredient(mockIngredient2.id)
    );
    expect(state3.constructorItems.ingredients).not.toContainEqual(
      mockIngredient2
    );
  });
});

describe('тесты по оформлению заказа', () => {
  test('стадия заказа: запрос', () => {
    const action = { type: burgerOrder.pending.type };
    const state = constructorReducer(initState, action);
    expect(state.orderRequest).toBe(true);
    expect(state.orderModalData).toBeNull();
  });

  test('стадия заказа: успешное выполнение', () => {
    const action = { type: burgerOrder.fulfilled.type, payload: mockResponse };
    const state = constructorReducer(initState, action);
    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toEqual({ number: 1111 });
  });

  test('стадия заказа: ошибка запроса', () => {
    const action = { type: burgerOrder.rejected.type };
    const state = constructorReducer(initState, action);
    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toBeNull();
  });

  test('стадия заказа: ошибка без ингредиентов', () => {
    // const action = burgerOrder.rejected(
    //   new Error(),
    //   'request-id',
    //   [] // пустой массив
    // );
    // const state = constructorReducer(initState, action);

    // expect(state.orderRequest).toBe(false);
    // expect(state.orderModalData).toBeNull();
    const action = { type: burgerOrder.rejected.type } as any;
    const state = constructorReducer(initState, action);

    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toBeNull();
  });
});

describe('тест апи', () => {
  const mockedOrderBurgerApi = orderBurgerApi as jest.MockedFunction<
    typeof orderBurgerApi
  >;

  test('fulfilled', async () => {
    const store = configureStore({
      reducer: { burger: constructorReducer }
    });
    mockedOrderBurgerApi.mockResolvedValue(fulfilledResponse);
    const action = await store.dispatch(
      burgerOrder([mockBun._id, mockIngredient._id])
    );
    const { burger } = store.getState();
    expect(action.type).toContain('fulfilled');
    expect(burger.orderRequest).toBe(false);
  });

  test('rejected', async () => {
    const store = configureStore({
      reducer: { burger: constructorReducer }
    });
    mockedOrderBurgerApi.mockRejectedValue(new Error('Сетевая ошибка'));
    const action = await store.dispatch(
      burgerOrder([mockBun._id, mockIngredient._id])
    );
    const { burger } = store.getState();
    expect(action.type).toContain('rejected');
    expect(burger.orderRequest).toBe(false);
    expect(burger.orderModalData).toBeNull();
  });

  test('pending', async () => {
    const action = burgerOrder.pending('pending-test', []);
    const state = constructorReducer(initState, action);
    expect(action.type).toContain('pending');
    expect(state.orderRequest).toBe(true);
  });
});
