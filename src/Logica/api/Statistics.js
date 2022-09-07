
import axios from 'axios';
import { DiagramState, Get_statistics, SortDate } from '../reducers/userReducer';



export const Get_AllStatistics = (date, id) => {
    let GetTokens = localStorage.getItem('token')
    return async dispatch => {
        try {
            const response = await axios.get('https://flowerchemistry.herokuapp.com/users/stat/all/0', {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${GetTokens}`,
                }
            })

            dispatch({ type: Get_statistics, statistics: response.data })


        }
        catch (e) {
            console.log("e:", e.message)

        }
    }
}


export const SearchEmloyessGet = (values) => {

    let GetTokens = localStorage.getItem('token')

    return async dispatch => {
        try {
            const response = await axios.get(`https://flowerchemistry.herokuapp.com/users/stat/all/0?name=${values}`,
                {
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${GetTokens}`,
                    }
                })

            dispatch({ type: Get_statistics, statistics: response.data })



        }
        catch (e) {
            console.log("e: ", e.message)
        }
    }
}


export const EmloyessSalary = (id, days) => {

    let GetTokens = localStorage.getItem('token')


    return async dispatch => {
        try {
            const response = await axios.get(`https://flowerchemistry.herokuapp.com/users/get/stats/${days}?id=${id}`,
                {
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${GetTokens}`,
                    }
                })

            dispatch({ type: SortDate, sortDate: response.data })



        }
        catch (e) {
            console.log("e: ", e.message)
        }
    }
}






export const Diagram = (id) => {
    let GetTokens = localStorage.getItem('token')

    return async dispatch => {
        try {
            const response = await axios.get(`https://flowerchemistry.herokuapp.com/users/diagram/stat/${id}`,
                {
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${GetTokens}`,
                    }
                })
            dispatch({ type: DiagramState, diagramState: response.data })
            console.log("Diagrsmmdd : ", response.data)



        }
        catch (e) {
            console.log("e: ", e.message)
        }
    }
}



