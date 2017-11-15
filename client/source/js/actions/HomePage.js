export const HP_HANDLE_CHANGE = 'HP_HANDLE_CHANGE';
export const HP_SET_EMAIL_STATUS = 'HP_SET_EMAIL_STATUS';

export function hpHandleChange(event) {
  return {
    type: HP_HANDLE_CHANGE,
    event
  };
}

export function hpSetEmailStatus(emailStatus) {
  return {
    type: HP_SET_EMAIL_STATUS,
    emailStatus
  }
}
