export const HANDLE_CHANGE = 'HANDLE_CHANGE';
export const SET_EMAIL_STATUS = 'SET_EMAIL_STATUS';

export function handleChange(event) {
  return {
    type: HANDLE_CHANGE,
    event
  };
}

export function setEmailStatus(emailStatus) {
  return {
    type: SET_EMAIL_STATUS,
    emailStatus
  }
}
