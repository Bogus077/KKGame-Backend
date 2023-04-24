export type CreateKidType = {
  request: {
    TeamId?: number;
    name: string;
    surname: string;
  }
}

export type GetKidType = {
  request: {
    id: number;
  }
}

export type EditKidType = {
  request: CreateKidType['request'] & { id: number }
};

export type DeleteKidType = {
  request: {
    id: number;
  }
}