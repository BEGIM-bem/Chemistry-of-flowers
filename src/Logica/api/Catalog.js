import axios from 'axios';
import swal from 'sweetalert';
import { GET_categoryBouquet } from '../reducers/userReducer'
import { GET_bouquet, GET_categoryFlowers, GET_flowers } from '../reducers/userReducer'



let GetTokens = localStorage.getItem('token')
let headers = {
    accept: 'application/json',
    Authorization: `Bearer ${GetTokens}`,
}

export const Get_CategoryBouquets = () => {
    let GetTokens = localStorage.getItem('token')

    return async dispatch => {
        try {
            const response = await axios.get('https://flowerchemistry.herokuapp.com/bouquet-category', {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${GetTokens}`,
                }
            })

            dispatch({ type: GET_categoryBouquet, categoryBouquet: response.data })
        }
        catch (e) {
            console.log("e:", e.message)

        }
    }
}

export const Add_categoryBouquet = (value) => {
    return async dispatch => {
        try {
            const response = await axios.post(`https://flowerchemistry.herokuapp.com/bouquet-category`,
                { text: value }
                , {

                    headers

                })

            if (response.status === 201 || response.status === 201) {

                dispatch(Get_CategoryBouquets())

            }

        } catch (error) {

        }

    }
}

export const Delete_BouquetCategory = (id) => {
    return async dispatch => {
        try {
            const response = await axios.delete(`https://flowerchemistry.herokuapp.com/bouquet-category/${id}`, {
                headers
            }

            )
            if (response.status >= 201 || response.status < 299) {
                dispatch(Get_CategoryBouquets())
            }

        } catch (e) {
            console.log('error: ', e.message)
        }

    }
}



export const Delete_Bouquet = (id) => {
    return async dispatch => {
        try {
            const response = await axios.delete(`https://flowerchemistry.herokuapp.com/bouquet/${id}`, {
                headers
            }
            )
            if (response.status >= 201 || response.status < 299) {

                dispatch(Get_Bouquet())
                swal({ icon: "success", title: 'Букет был усешно удален', dangerMode: true })
            }

        } catch (error) {
            swal({ icon: "error", title: "Вы не можете удалить этот букет", dangerMode: true })
        }

    }
}

export const Add_Flowers = (values, setActive) => {

    let GetTokens = localStorage.getItem('token')

    return async dispatch => {
        try {
            const response = await axios.post(`https://flowerchemistry.herokuapp.com/flowers`,

                values
                , {

                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${GetTokens}`,
                        "content-type": "application/json"

                    }
                })

            if (response.status >= 201 || response.status < 299) {
                swal({ icon: "success", title: 'Товар был усешно создан ', dangerMode: true })
                dispatch(Get_flowers())
                setActive(false)

            }


        } catch (error) {
            swal({ icon: "error", title: error.response.data.message, dangerMode: true })

        }

    }
}



export const Get_Bouquet = () => {
    let GetTokens = localStorage.getItem('token')

    return async dispatch => {
        try {
            const response = await axios.get('https://flowerchemistry.herokuapp.com/bouquet', {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${GetTokens}`,
                }
            })


            dispatch({ type: GET_bouquet, bouquet: response.data })
        }
        catch (e) {
            console.log("e:", e.message)

        }
    }
}

export const EditBouthet = (values) => {

    const { id, name, nameEmlpoyees, filial, cost, description, category, selection } = values
    return async dispatch => {
        try {
            const response = await axios.patch(`https://flowerchemistry.herokuapp.com/bouquet/${id}`,
                {
                    id, name, nameEmlpoyees, filial, cost, description, category, selection
                }
                ,
                {
                    headers
                })
            if (response.status === 200 || response.status === 201) {

                dispatch(Get_Bouquet())
                swal({ icon: "success", title: 'Букет был обновлен', dangerMode: true })

            }

        } catch (error) {

            swal({ icon: "error", title: error.response.data.message, dangerMode: true })

        }

    }
}


export const Get_flowers = () => {
    let GetTokens = localStorage.getItem('token')
    return async dispatch => {
        try {
            const response = await axios.get('https://flowerchemistry.herokuapp.com/flowers', {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${GetTokens}`,
                }
            })
            dispatch({ type: GET_flowers, flowers: response.data })
        }
        catch (e) {
            console.log("e:", e.message)

        }
    }
}

export const EditFlowers = (values) => {
    const { id, name, grade, cost, date, quantity, image, category, shortDescription, description } = values
    return async dispatch => {
        try {
            const response = await axios.patch(`https://flowerchemistry.herokuapp.com/flowers/${id}`,
                {
                    id, image, date, name, grade, cost, quantity, category, shortDescription, description
                },
                {
                    headers
                })
            if (response.status === 200 || response.status === 201) {

                dispatch(Get_flowers())
                swal({ icon: "success", title: 'Товар был обновлен', dangerMode: true })
            }

        } catch (error) {

            swal({ icon: "error", title: error.response.data.message, dangerMode: true })

        }

    }
}

export const DeleteFlowers = (id) => {
    return async dispatch => {
        try {
            const response = await axios.delete(`https://flowerchemistry.herokuapp.com/flowers/${id}`, {
                headers
            }

            )
            if (response.status === 200) {
                dispatch(Get_flowers())
                swal({ icon: "success", title: 'Товар был усешно удален', dangerMode: true })

            }

        } catch (error) {
            swal({ icon: "error", title: 'Вы не можете удалить этот товар', dangerMode: true })
        }

    }
}

export const SearchFlowers = (values) => {

    return async dispatch => {
        try {
            const response = await axios.get(`https://flowerchemistry.herokuapp.com/flowers?search=${values}`,
                { headers })
            dispatch({ type: GET_flowers, flowers: response.data })

        } catch (e) {

            console.log('error: ', e.message)

        }

    }
}

export const SearchBouquet = (values) => {

    return async dispatch => {
        try {
            const response = await axios.get(`https://flowerchemistry.herokuapp.com/bouquet?search=${values}`,
                { headers })

            dispatch({ type: GET_bouquet, bouquet: response.data })

        }
        catch (e) {
            console.log("e: ", e.message)
        }
    }
}

export const Get_category = () => {
    let GetTokens = localStorage.getItem('token')


    return async dispatch => {
        try {
            const response = await axios.get('https://flowerchemistry.herokuapp.com/flowerCategory', {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${GetTokens}`,
                }
            }
            )

            dispatch({ type: GET_categoryFlowers, categoryFlowers: response.data })

        }
        catch (e) {
            console.log("e:", e.message)

        }
    }
}

export const Add_category = (value) => {

    return async dispatch => {
        try {
            const response = await axios.post(`https://flowerchemistry.herokuapp.com/flowerCategory`,

                { text: value }
                , {

                    headers

                })
            dispatch(Get_category())


        } catch (error) {
            swal({ icon: "error", title: error.response.data.message, dangerMode: true })
        }


    }
}

export const Delete_category = (id) => {
    return async dispatch => {
        try {
            const response = await axios.delete(`https://flowerchemistry.herokuapp.com/flowerCategory/${id}`, {
                headers
            }

            )
            if (response.status === 200) {
                dispatch(Get_category())

            }

        } catch (e) {
            console.log('error: ', e.message)
        }

    }
}



export const EditCategoryFlowers = (id, text) => {

    return async dispatch => {
        try {
            const response = await axios.patch(`https://flowerchemistry.herokuapp.com/flowerCategory/${id}`,
                { text },
                {
                    headers
                })


            if (response.status === 200) {
                dispatch(Get_category())
            }

        }
        catch (e) {
            console.log("e: ", e.message)
        }
    }
}

export const EditCategoryBouquet = (id, text) => {

    return async dispatch => {
        try {
            const response = await axios.patch(`https://flowerchemistry.herokuapp.com/bouquet-category/${id}`,
                { text },
                {
                    headers
                })

            dispatch(Get_CategoryBouquets())

        }
        catch (e) {
            console.log("e: ", e.message)
        }
    }
}    
