import { Map } from 'immutable';

import {
  SP_HANDLE_CHANGE,
  SP_CONCAT_RESULTS,
  SP_OPEN_GALLERY,
  SP_CLOSE_GALLERY,
  SP_CHNG_GALLERY_IMG
} from 'actions/SearchPage';

const initialState = Map({
  searchText: '',
  prevSearchText: '',
  searchResults: [],
  noMoreResult: false,
  gallerySettings: {
    images: [],
    isOpen: false,
    currentImage: 0
  }
});

const actionsMap = {
  [SP_HANDLE_CHANGE]: (state, action) => {
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
      searchResults: freshReload ? newResults : prevResults.concat(newResults),
      prevSearchText: state.get('searchText'),
      noMoreResult: !newResults.length
    }));
  },

  [SP_OPEN_GALLERY]: (state, action) => {
    const images = action.photoLinks.map(src => {
      return {
        src,
        thumbnail: src,
        orientation: 'landscape'
      };
    });
    return state.merge(Map({
      gallerySettings: {
        images,
        currentImage: 0,
        isOpen: true
      }
    }));
  },

  [SP_CLOSE_GALLERY]: (state, action) => {
    const gallerySettings = {
      images: [],
      isOpen: false,
      currentImage: 0
    };
    return state.merge(Map({ gallerySettings }));
  },

  [SP_CHNG_GALLERY_IMG]: (state, action) => {
    const { imgIndex } = action;
    let currentImage = state.get('gallerySettings').currentImage;
    if (imgIndex === 'next') {
      currentImage += 1;
    } else if (imgIndex === 'prev') {
      currentImage -= 1;
    } else {
      currentImage = imgIndex;
    }
    const gallerySettings = {
      images: [ ...state.get('gallerySettings').images ],
      isOpen: state.get('gallerySettings').isOpen,
      currentImage
    };
    return state.merge(Map({ gallerySettings }));
  }

};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
