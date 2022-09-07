import axios from 'axios';
import { boolean } from 'yup';
import { GET_orders, StatusSecond, GET_ordersActive, StatusFirst } from '../reducers/userReducer';
import swal from 'sweetalert';

export const Get_Orders = (type) => {

    let GetTokens = localStorage.getItem('token')
    return async dispatch => {
        try {
            const response = await axios.get('https://flowerchemistry.herokuapp.com/order', {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${GetTokens}`,
                }
            })



            dispatch({ type: GET_orders, orders: { typeStatus: type, data: response.data } })



        }
        catch (e) {
            console.log("e:", e.message)

        }
    }
}



export const Change_Status = (id, status, type) => {

    let GetTokens = localStorage.getItem('token')
    return async dispatch => {
        try {
            const response = await axios.patch(`https://flowerchemistry.herokuapp.com/order/status/${id}`,
                { "status": status },
                {
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${GetTokens}`,
                    }
                })


            if (response.status === 200 || response.status === 201) {

                swal({ icon: "success", title: 'Статус ушпено поменялся', dangerMode: true })
                dispatch(Get_Orders(type))


            }




        }
        catch (e) {
            console.log("e:", e.message)

        }
    }
}

export const Change_DateOrders = (values) => {



    let GetTokens = localStorage.getItem('token')

    return async dispatch => {
        try {
            const response = await axios.patch(`https://flowerchemistry.herokuapp.com/order/update/${values.id}`,
                { values },
                {
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${GetTokens}`,
                    }
                }
            )


        }
        catch (e) {

            console.log("e:", e.message)

        }
    }
}


export const Delte_Status = (id, type) => {


    let GetTokens = localStorage.getItem('token')

    return async dispatch => {
        try {
            const response = await axios.delete(`https://flowerchemistry.herokuapp.com/order/${id}`,

                {
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${GetTokens}`,
                    }
                }
            )

            if (response.status === 200 || response.status === 201) {


                dispatch(Get_Orders(type))


            }

        }
        catch (e) {

            console.log("e:", e.message)

        }
    }
}

