export const SET_AUTHED_USER = 'SET_AUTHED_USER';

export function setAuthedUser(id) {
  console.log(id);
  return {
    type: SET_AUTHED_USER,
    id,
  };
}
