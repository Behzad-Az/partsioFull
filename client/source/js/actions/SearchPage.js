export const SP_HANDLE_CHANGE = 'SP_HANDLE_CHANGE';
export const SP_CONCAT_RESULTS = 'SP_CONCAT_RESULTS';
export const SP_OPEN_GALLERY = 'SP_OPEN_GALLERY';
export const SP_CLOSE_GALLERY = 'SP_CLOSE_GALLERY';
export const SP_CHNG_GALLERY_IMG = 'SP_CHNG_GALLERY_IMG';

export function spHandleChange(event) {
  return {
    type: SP_HANDLE_CHANGE,
    event
  };
}

export function spConcatResults(args) {
  return {
    type: SP_CONCAT_RESULTS,
    args
  };
}

export function spOpenGallery(photoLinks) {
  return {
    type: SP_OPEN_GALLERY,
    photoLinks
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
