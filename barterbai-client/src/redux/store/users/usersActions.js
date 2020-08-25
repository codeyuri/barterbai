import axios from 'axios'

export const login = user => (dispatch) => {
    await axios.post("/users/login", user).then(res => {
            dispatch({
                type: 'CREATE_TASK',
                payload: res.data
            })
        }
    );
}