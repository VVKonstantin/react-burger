export type TIngredient = {
  readonly _id: string;
  readonly name: string;
  readonly type: string;
  readonly calories: number;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v: number;
  counter: number;
};

export type TRawIngredient = Omit<TIngredient, 'counter'>;

export type TIngredientInBurger = TIngredient & { uniqueId: string; };

export type TOrders = {
  orders: Array<TOrder> | null;
  total: number | null;
  totalToday: number | null;
};

export type TOrder = {
  readonly _id: string;
  readonly ingredients: ReadonlyArray<string>;
  readonly status: string;
  readonly name: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly number: number;
};

export type TUser = {
  readonly email: string;
  readonly name: string;
};

export interface IWSOptions {
  wsInit: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
}

export type TFormFields = {
  name?: string;
  email?: string;
  password?: string;
  code?: string;
  isEdited?: boolean;
};

export type TRequestOptions = {
  headers: { authorization?: string; 'Content-type': string; }
  method?: string;
  body?: string;
};

export interface IResponse<T> extends Response {
  json(): Promise<T>;
}

export interface IResBody {
  success: boolean;
}

export interface IIngredientsResponse extends IResBody {
  data: Array<TIngredient>;
}

export interface IAuthResponse extends IResBody {
  message: string;
}

export interface ITokenResponse extends IResBody {
  accessToken: string;
  refreshToken: string;
}

export interface IUserResponse extends IResBody {
  user: { email: string; name: string; }
}

export interface ILoginResponse extends ITokenResponse, IUserResponse { }

export interface IPostOrderResponse extends IResBody {
  name: string;
  order: {
    createdAt: string;
    ingredients: Array<string>;
    name: string;
    number: number;
    owner: {
      createdAt: string;
      email: string;
      name: string;
      updatedAt: string;
    };
    price: number;
    status: string;
    updatedAt: string;
    _id: string;
  };
}
