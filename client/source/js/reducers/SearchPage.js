import { Map } from 'immutable';

import {
  SP_SET_ASYNC_FLAG,
  SP_HANDLE_CHNG,
  SP_CONCAT_RESULTS,
  SP_OPEN_GALLERY,
  SP_CLOSE_GALLERY,
  SP_CHNG_GALLERY_IMG,
  SP_TOGGLE_MODAL,
  SP_HANDLE_MODAL_CHNG,
  SP_FLAG_ITEM,
  SP_LIKE_ITEM
} from 'actions/SearchPage';

const initialState = Map({
  asyncLoading: false,
  dataLoaded: false,
  asyncError: false,
  searchText: '',
  prevSearchText: '',
  searchResults: [],
  flaggedItems: new Set(),
  likedItems: new Set(),
  noMoreResult: false,
  galleryParams: {
    images: [],
    isOpen: false,
    currentImage: 0
  },
  modalParams: {
    id: null
  }
});

const actionsMap = {
  [SP_SET_ASYNC_FLAG]: (state, action) => {
    return state.merge((Map(action.args)));
  },

  [SP_HANDLE_CHNG]: (state, action) => {
    const { name, value } = action.event.target;
    let stateObj = {};
    stateObj[name] = value;
    return state.merge(Map(stateObj));
  },

  [SP_CONCAT_RESULTS]: (state, action) => {
    const prevResults = state.get('searchResults');
    let { newResults, freshReload } = action.args;
    if (!freshReload) {
      const prevIds = prevResults.map(result => result._id);
      newResults = newResults.filter(result => !prevIds.includes(result._id));
    }
    return state.merge(Map({
      asyncLoading: false,
      asyncError: false,
      dataLoaded: true,
      searchResults: freshReload ? newResults : prevResults.concat(newResults),
      prevSearchText: state.get('searchText'),
      noMoreResult: !newResults.length
    }));
  },

  [SP_OPEN_GALLERY]: (state, action) => {
    const images = action.photos.map(photo => {
      return {
        src: photo.link,
        thumbnail: photo.link,
        caption: photo.caption,
        orientation: 'landscape'
      };
    });
    return state.merge(Map({
      galleryParams: {
        images,
        currentImage: 0,
        isOpen: true
      }
    }));
  },

  [SP_CLOSE_GALLERY]: (state, action) => {
    const galleryParams = {
      images: [],
      isOpen: false,
      currentImage: 0
    };
    return state.merge(Map({ galleryParams }));
  },

  [SP_CHNG_GALLERY_IMG]: (state, action) => {
    const { imgIndex } = action;
    let currentImage = state.get('galleryParams').currentImage;
    if (imgIndex === 'next') {
      currentImage += 1;
    } else if (imgIndex === 'prev') {
      currentImage -= 1;
    } else {
      currentImage = imgIndex;
    }
    const galleryParams = {
      images: [ ...state.get('galleryParams').images ],
      isOpen: state.get('galleryParams').isOpen,
      currentImage
    };
    return state.merge(Map({ galleryParams }));
  },

  [SP_TOGGLE_MODAL]: (state, action) => {
    return state.merge(Map({ modalParams: action.modalParams }));
  },

  [SP_HANDLE_MODAL_CHNG]: (state, action) => {
    const { name, value } = action.event.target;
    let modalParams = { ...state.get('modalParams') };
    modalParams[name] = value;
    return state.merge(Map({ modalParams }));
  },

  [SP_FLAG_ITEM]: (state, action) => {
    const { itemId } = action;
    let flaggedItems = new Set(state.get('flaggedItems'));
    flaggedItems.has(itemId) ? flaggedItems.delete(itemId) : flaggedItems.add(itemId);
    return state.merge(Map({ flaggedItems }));
  },

  [SP_LIKE_ITEM]: (state, action) => {
    const { itemId } = action;
    let likedItems = new Set(state.get('likedItems'));
    likedItems.has(itemId) ? likedItems.delete(itemId) : likedItems.add(itemId);
    return state.merge(Map({ likedItems }));
  }

};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
