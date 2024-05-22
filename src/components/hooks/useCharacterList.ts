import { useReducer } from "react";

type CharacterListState = {
  itemSelected?: string;
  currentPage?: number;
  totalPages: number;
};

const initialState: CharacterListState = {
  totalPages: 0,
  currentPage: 1,
};

enum actionTypes {
  CHANGE_CURRENT_PAGE = "CHANGE_CURRENT_PAGE",
  SELECT_ITEM = "SELECT_ITEM",
  SET_TOTAL_PAGES = "SET_TOTAL_PAGES",
}

type ChangeCurrentPageAction = {
  type: actionTypes.CHANGE_CURRENT_PAGE;
  payload: number;
};

type SelectItemAction = {
  type: actionTypes.SELECT_ITEM;
  payload: string;
};

type SetTotalPagesmAction = {
  type: actionTypes.SET_TOTAL_PAGES;
  payload: number;
};

const characterListReducer = (
  state: CharacterListState,
  {
    type,
    payload,
  }: ChangeCurrentPageAction | SelectItemAction | SetTotalPagesmAction
): CharacterListState => {
  switch (type) {
    case actionTypes.CHANGE_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: payload,
      };
    }
    case actionTypes.SELECT_ITEM: {
      return {
        ...state,
        itemSelected: payload,
      };
    }
    case actionTypes.SET_TOTAL_PAGES: {
      return {
        ...state,
        totalPages: payload,
      };
    }

    default: {
      return state;
    }
  }
};

export const useCharacterList = () => {
  const [state, dispatch] = useReducer(characterListReducer, initialState);
  const { currentPage, itemSelected, totalPages } = state;

  const changeCurrentPage = (newPage: number) => {
    dispatch({
      type: actionTypes.CHANGE_CURRENT_PAGE,
      payload: newPage,
    });
  };

  const selectItem = (item: string) => {
    dispatch({
      type: actionTypes.SELECT_ITEM,
      payload: item,
    });
  };

  const setTotalPages = (items: number) => {
    dispatch({
      type: actionTypes.SET_TOTAL_PAGES,
      payload: Math.ceil(items / 10),
    });
  };

  return {
    currentPage,
    itemSelected,
    totalPages,
    changeCurrentPage,
    selectItem,
    setTotalPages,
  };
};
