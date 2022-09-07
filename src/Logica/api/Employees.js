import axios from 'axios';
import swal from 'sweetalert';
export const GET_EMPLOYESS = 'GET_EMPLOYESS'


export const Get_Employess = (type) => {
    let GetTokens = localStorage.getItem('token')
    return async dispatch => {
        try {
            const response = await axios.get('https://flowerchemistry.herokuapp.com/users', {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${GetTokens}`,
                }
            }
            )
            dispatch({ type: GET_EMPLOYESS, employees: { typeStatus: type, date: response.data } })


        }
        catch (e) {
            console.log("e:", e.message)

        }
    }
}


export const Add_employess = (values, setActive) => {

    let GetTokens = localStorage.getItem('token')
    return async dispatch => {
        try {
            const response = await axios.post(`https://flowerchemistry.herokuapp.com/users/create`, values, {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${GetTokens}`,
                    "Content-type": 'multipart/form-data'
                }

            })
            if (response.status === 200 || response.status === 201) {

                swal({ icon: "success", title: 'Сотрудник был успешно создан', dangerMode: true })
                setActive(false)
                dispatch(Get_Employess())


            }


        } catch (error) {
            swal({ icon: "error", title: error.response.data.message, })
        }

    }
}





export const Update_employess_data = (values, type) => {
    let GetTokens = localStorage.getItem('token')
    return async dispatch => {
        try {
            const response = await axios.patch(`https://flowerchemistry.herokuapp.com/users/${values.id}`, values, {

                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${GetTokens}`,

                }

            })
            if (response.status === 200) {

                dispatch(Get_Employess(type))
                swal({ icon: "success", title: 'Данные сотрудника были успешно обновлены', dangerMode: true })

            }

        } catch (e) {

            console.log('error: ', e.message)


        }

    }
}

export const Delete_employess_data = (id, type) => {
    let GetTokens = localStorage.getItem('token')
    return async dispatch => {
        try {
            const response = await axios.delete(`https://flowerchemistry.herokuapp.com/users/${id}`, {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${GetTokens}`,

                }


            })
            if (response.status === 200) {

                swal({ icon: "success", title: 'Сотрудник был успешно удален', dangerMode: true })
                dispatch(Get_Employess(type))



            }

        } catch (e) {

            console.log('error: ', e.message)


        }

    }
}


