import { Action, Reducer } from 'redux';
import IArticle from '../models/IArticle';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface ArticleState {
    articles: IArticle[];
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

export interface AddArticleAction { type: 'ADD_ARTICLE', elements: IArticle[] }
export interface RemoveArticleAction { type: 'REMOVE_ARTICLE', id: number }
export interface PinArticleAction { type: 'PIN_ARTICLE', id: number }
export interface ClearActiclesAction { type: 'CLEAR_ARTICLE' }
export interface SearchActiclesAction { type: 'SEARCH_ARTICLE', searchquerry: string }

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
export type KnownAction = AddArticleAction | RemoveArticleAction | PinArticleAction | ClearActiclesAction | SearchActiclesAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    add: (...elements: IArticle[]) => ({ type: 'ADD_ARTICLE', elements: elements } as AddArticleAction),
    remove: (id: number) => ({ type: 'REMOVE_ARTICLE', id: id } as RemoveArticleAction),
    pin: (id: number) => ({ type: 'PIN_ARTICLE', id: id } as PinArticleAction),
    clear: () => ({ type: 'CLEAR_ARTICLE' } as ClearActiclesAction),
    search: (searchquerry: string) => ({ type: 'SEARCH_ARTICLE', searchquerry: searchquerry } as SearchActiclesAction),
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer: Reducer<ArticleState> = (state: ArticleState | undefined, incomingAction: Action): ArticleState => {
    if (state === undefined) {
        return { articles: [] };
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'ADD_ARTICLE':
            return { articles: [...state.articles, ...action.elements] };
        case 'REMOVE_ARTICLE':
            state.articles.splice(action.id, 1);
            return { articles: [...state.articles] };
        case 'PIN_ARTICLE':
            const element = state.articles.splice(action.id, 1);
            return { articles: [...element, ...state.articles]};
        case 'CLEAR_ARTICLE':
            return { articles: []};
        case 'SEARCH_ARTICLE':
            const copy = [...state.articles];
            const filteredArray = copy.filter((p) => `${p.title} ${p.description}`.toLowerCase().indexOf(action.searchquerry.toLowerCase()) !== -1)
            return { articles: [...filteredArray]};
        default:
            return state;
    }
};
