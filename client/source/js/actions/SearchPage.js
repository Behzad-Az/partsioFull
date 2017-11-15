export const SP_HANDLE_CHANGE = 'SP_HANDLE_CHANGE';
export const SP_CONCAT_RESULTS = 'SP_CONCAT_RESULTS';

export function spHandleChange(event) {
  return {
    type: SP_HANDLE_CHANGE,
    event
  };
}

export function spConcatResults(resJSON) {
  return {
    type: SP_CONCAT_RESULTS,
    resJSON
  };
}
