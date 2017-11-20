export const SP_SET_ASYNC_FLAG = 'SP_SET_ASYNC_FLAG';
export const SP_HANDLE_CHNG = 'SP_HANDLE_CHNG';
export const SP_CONCAT_RESULTS = 'SP_CONCAT_RESULTS';
export const SP_OPEN_GALLERY = 'SP_OPEN_GALLERY';
export const SP_CLOSE_GALLERY = 'SP_CLOSE_GALLERY';
export const SP_CHNG_GALLERY_IMG = 'SP_CHNG_GALLERY_IMG';
export const SP_TOGGLE_MODAL = 'SP_TOGGLE_MODAL';
export const SP_HANDLE_MODAL_CHNG = 'SP_HANDLE_MODAL_CHNG';

export function spSetAsyncLoading(args) {
  return {
    type: SP_SET_ASYNC_FLAG,
    args
  };
}

export function spHandleChng(event) {
  return {
    type: SP_HANDLE_CHNG,
    event
  };
}

export function spConcatResults(args) {
  return {
    type: SP_CONCAT_RESULTS,
    args
  };
}

export function spOpenGallery(photos) {
  return {
    type: SP_OPEN_GALLERY,
    photos
  };
}

export function spCloseGallery() {
  return {
    type: SP_CLOSE_GALLERY
  };
}

export function spChngGalleryImg(imgIndex) {
  return {
    type: SP_CHNG_GALLERY_IMG,
    imgIndex
  };
}

export function spToggleModal(modalParams) {
  return {
    type: SP_TOGGLE_MODAL,
    modalParams
  };
}

export function spHandleModalChng(event) {
  return {
    type: SP_HANDLE_MODAL_CHNG,
    event
  };
}
