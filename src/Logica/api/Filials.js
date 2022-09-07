import swal from 'sweetalert';
import axios from 'axios';
import { GET_Filials } from '../reducers/userReducer';
let GetTokens = localStorage.getItem('token')



let headers = {
    accept: 'application/json',
    Authorization: `Bearer ${GetTokens}`,
    "content-type": "application/json"
}
export const Get_filials = () => {
    let GetTokens = localStorage.getItem('token')
    return async dispatch => {
        try {
            const response = await axios.get('https://flowerchemistry.herokuapp.com/filials', {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${GetTokens}`,
                }
            })
            dispatch({ type: GET_Filials, filials: response.data })


        }
        catch (e) {
            console.log("e:", e.message)

        }
    }
}


export const Update_filials_data = (values, setActive) => {
    const { id, address, phone, schedule } = values
    return async dispatch => {
        try {
            const response = await axios.patch(`https://flowerchemistry.herokuapp.com/filials/${id}`, {
                id,
                address,
                phone,
                schedule
            }, {
                headers
            })

            if (response.status === 200 || response.status === 201) {
                dispatch(Get_filials())
                setActive({ d: false, s: null })
                swal({ icon: "success", title: 'Данные филиала были обновлены', dangerMode: true })
            }

        } catch (e) {


        }

    }
}


export const Delete_filials_data = (id, setActive) => {
    return async dispatch => {
        try {
            const response = await axios.delete(`https://flowerchemistry.herokuapp.com/filials/${id}`,
                {
                    headers
                })


            if (response.status === 200 || response.status === 201) {
                dispatch(Get_filials())
                setActive({ d: false, s: null })
                swal({ icon: "success", title: 'Филиал был удален', dangerMode: true })
            }

        } catch (error) {

            swal({ icon: "error", title: 'Вы не можете удалить этот филиал', dangerMode: true })
            setActive({ d: false, s: null })


        }

    }
}



export const Add_Filials = (values, setActive) => {

    return async dispatch => {
        try {
            const response = await axios.post(`https://flowerchemistry.herokuapp.com/filials`,
                {

                    address: values.address,
                    phone: values.phone,
                    schedule: values.schedule
                }
                , {

                    headers

                })

            if (response.status === 200 || response.status === 201) {
                dispatch(Get_filials())
                setActive(false)
                swal({ icon: "success", title: 'Поздравляю с открытимем нового филиала', dangerMode: true })
            }


        } catch (error) {

            swal({ icon: "error", title: error.response.data.message, dangerMode: true })


        }

    }
}

