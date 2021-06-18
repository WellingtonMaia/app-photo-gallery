const types = {
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
}

type Image = {
  id: string;
  width: number;
  height: number;
}

type GetAllImages = {
  photos: Image[];
  page: number;
}

export const actionCreators = {
  loading: () => ({ type: types.LOADING }),
  failure: () => ({ type: types.FAILURE }),
  success: ({ photos, page }: GetAllImages) => ({
    type: types.SUCCESS,
    payload: { photos, page },
  })
}

export const initialState = {
  loading: false,
  error: false,
  photos: [],
  nextPage: 1,
}

// export type StateProps = {
//   loading: boolean
//   error: boolean
//   photos: Image[]
//   nextPage: number
// }

export function reducer(state: any, action: any) {
  switch (action.type) {
    case types.LOADING:
      return { ...state, loading: true, error: false}
    case types.SUCCESS: 
      return {
        ...state,
        loading: false,
        error: false,
        photos: [ ...state.photos, ...action.payload.photos],
        nextPage: state.nextPage + 1,
      }
    case types.FAILURE: 
      return { ...state, loading: false, error: true}
  
    default:
      break;
  }
}