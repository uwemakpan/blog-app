import { setCurrentUser } from './userSlice'

export const updateCurrentUser = () => (dispatch) => {
  const user = {
    firstName: 'Uwem',
    lastName: 'Akpan',
    age: 30,
    isVerified: true,
  }

  dispatch(setCurrentUser(user))
}
