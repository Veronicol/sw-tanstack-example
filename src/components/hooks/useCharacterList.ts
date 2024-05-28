import { useReducer } from "react";

type CharacterListState = {
  itemSelected?: string;
  currentPage: number;
};

const initialState: CharacterListState = {
  currentPage: 1,
};

enum actionTypes {
  CHANGE_CURRENT_PAGE = "CHANGE_CURRENT_PAGE",
  SELECT_ITEM = "SELECT_ITEM",
}

type ChangeCurrentPageAction = {
  type: actionTypes.CHANGE_CURRENT_PAGE;
  payload: number;
};

type SelectItemAction = {
  type: actionTypes.SELECT_ITEM;
  payload: string;
};

const characterListReducer = (
  state: CharacterListState,
  { type, payload }: ChangeCurrentPageAction | SelectItemAction
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
    default: {
      return state;
    }
  }
};

export const useCharacterList = () => {
  const [state, dispatch] = useReducer(characterListReducer, initialState);
  const { currentPage, itemSelected } = state;

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

  return {
    currentPage,
    itemSelected,
    changeCurrentPage,
    selectItem,
  };
};
