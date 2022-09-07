
export const SET_USER = "SET_USER"
const LOGOUT = "LOGOUT"
export const GET_EMPLOYESS = 'GET_EMPLOYESS'
const LOADER = 'LOADER'
export const GET_categoryFlowers = 'GET_category'
export const GET_Filials = 'GET_filials';
export const ERROR = 'Error'
export const GET_bouquet = ' GET_bouquet'
export const GET_flowers = 'Get_flowers'
export const GET_categoryBouquet = 'GET_categoryBouquet'
export const Old_filter = 'Old_Filter'
export const PoolFilter = 'PoolFilter'
export const ExpensiveFilter = 'ExpensiveFilter'
export const Search = 'Search';
export const YongFilter = 'YongFilter';
export const AllEmloyess = 'AllEmloyess';
export const Admin = 'Admin';
export const Florists = 'Florists'
export const Courier = 'Courier'
export const GET_orders = 'GET_orders'
export const AllOrders = "AllOrders"
export const StatusFirst = 'StatusFirst'
export const StatusSecond = 'StatusSecond'
export const StatusSeventh = 'StatusSeventh'
export const Message = 'Message'
export const Statistics_Admin = 'Statistics_Admin'
export const Statistics_Flowers = 'Statistics_Flowers'
export const GET_ordersActive = 'GET_ordersActive'
export const Get_statistics = 'Get_statistics'
export const Statistics_Courier = 'Statistics_Courier'
export const All_statistics = ' All_statistics'
export const DiagramState = 'DiagramState'
export const SortDate = 'SortDate'

let Emloyess = []
// let Orders = []
let f = []
let Admin_Statistics = []
let Flowers_Statistics = []
let Courier_Statistics = []
let Position = []
let AllGetStatistics = []





const defaultState = {
    currentUser: [],
    isAuth: false,
    isLoading: false,
    bouquet: [],
    categoryFlowers: [],
    flowers: [],
    categoryBouquet: [],
    filials: [],
    employees: [],
    orders: [],
    error: '',
    ordersActive: [],
    message: '',
    statistics: [],
    diagramState: [],
    sortDate: []
}

function userReducer(state = defaultState, action) {

    switch (action.type) {
        case LOGOUT:
            localStorage.removeItem('token')

            return {
                ...state,
                currentUser: {},
                isAuth: false
            }
        case ERROR:
            return {
                ...state,
                error: action.error,


            }
        case GET_orders:
            f = []
            action.orders.data.map(item => item.status === 'eights' ? '' : f.unshift(item))

            let Orders = []
            if (action.orders.typeStatus === 'Подтвержденные') {
                action.orders.data.map(item => item.status === 'second' ? Orders.unshift(item) : '')
            }
            else if (action.orders.typeStatus === 'Ожидающие подтверждения') {
                action.orders.data.map(item => item.status === 'first' ? Orders.unshift(item) : '')
            }
            else if (action.orders.typeStatus === 'Завершенные') {
                action.orders.data.map(item => item.status === 'seventh' || item.status === 'eights' ?
                    Orders.unshift(item) : '')

            }
            else {
                f.map(item => Orders.unshift(item))
            }

            return {
                ...state,
                orders: Orders.sort((a, b) => a.id - b.id),
                isAuth: true

            }


        case AllOrders:

            return {
                ...state,
                orders: f.sort((a, b) => a.id - b.id),
                isAuth: true

            }


        case StatusFirst:

            let StatusFirstArray = []
            f.map(item => item.status === 'first' ? StatusFirstArray.unshift(item) : '')
            console.log("ff: ", f)
            return {
                ...state,
                orders: StatusFirstArray.sort((a, b) => a.id - b.id),
                isAuth: true
            }


        case StatusSecond:

            let StatusSecondArray = []
            f.map(item => item.status === 'second' || item.status === 'third' || item.status === 'fourth'
                || item.status === ' fifth' || item.status === 'sixth'
                ? StatusSecondArray.unshift(item) : '')

            return {
                ...state,
                orders: StatusSecondArray.sort((a, b) => a.id - b.id),
                isAuth: true
            }

        case StatusSeventh:

            let StatusSeventhArray = []
            f.map(item => item.status === 'seventh' || item.status === 'eights' ?
                StatusSeventhArray.unshift(item) : '')
            return {
                ...state,
                orders: StatusSeventhArray.sort((a, b) => a.id - b.id),
                isAuth: true
            }



        case GET_EMPLOYESS:

            Emloyess = []
            Position = []
            action.employees.date.map(item => item.role === 'Супер Админ' ? null : Emloyess.unshift(item))

            if (action.employees.typeStatus === 'Админы') {
                Emloyess.map(item => item.role === 'Админ' ? Position.unshift(item) : '')
            }
            else if (action.employees.typeStatus === 'Флорист') {
                Emloyess.map(item => item.role === 'Флорист' ? Position.unshift(item) : '')
            }
            else if (action.employees.typeStatus === 'Курьер') {
                Emloyess.map(item => item.role === 'Курьер' ? Position.unshift(item) : '')

            }
            else {
                Emloyess.map(item => Position.unshift(item))
            }



            return {
                ...state,
                employees: Position.sort((a, b) => a.id - b.id),
                isAuth: true

            }

        case AllEmloyess:
            return {
                ...state,
                employees: Emloyess.sort((a, b) => a.id - b.id),
                isAuth: true
            }

        case Admin:
            Position = []
            Emloyess.map(item => item.role === 'Админ' ? Position.unshift(item) : '')
            return {
                ...state,
                employees: Position.sort((a, b) => a.id - b.id),
                isAuth: true
            }

        case Florists:
            Position = []
            Emloyess.map(item => item.role === 'Флорист' ? Position.unshift(item) : '')
            return {
                ...state,
                employees: Position.sort((a, b) => a.id - b.id),
                isAuth: true
            }

        case Courier:
            Position = []
            Emloyess.map(item => item.role === 'Курьер' ? Position.unshift(item) : '')
            return {
                ...state,
                employees: Position.sort((a, b) => a.id - b.id),
                isAuth: true
            }



        case LOADER:
            return {
                ...state,
                isLoading: action.payload
            }


        case GET_Filials:
            return {
                ...state,
                filials: action.filials.sort((a, b) => a.id - b.id),
                isAuth: true

            }

        case GET_categoryFlowers:
            return {
                ...state,
                categoryFlowers: action.categoryFlowers,
                isAuth: true
            }

        case GET_categoryBouquet:
            return {
                ...state,
                categoryBouquet: action.categoryBouquet,
                isAuth: true
            }

        case GET_bouquet:
            return {
                ...state,
                bouquet: action.bouquet.sort((a, b) => new Date(a.dateExp) - new Date(b.dateExp)),
                isAuth: true
            }
        case GET_flowers:
            return {
                ...state,

                flowers: action.flowers.sort((a, b) => a.id - b.id),
                isAuth: true

            }

        case PoolFilter:
            console.log(state.flowers)
            let sortCostFlowersPool = state.flowers.sort((a, b) => a.cost - b.cost)
            let sortCostBouquetPool = state.bouquet.sort((a, b) => a.cost - b.cost)

            return {
                ...state,
                flowers: sortCostFlowersPool,
                bouquet: sortCostBouquetPool,
                isAuth: true
            }

        case ExpensiveFilter:
            console.log(state.flowers)
            let sortCostFlowersExpensive = state.flowers.sort((a, b) => b.cost - a.cost)
            let sortCostBouquetExpensive = state.bouquet.sort((a, b) => b.cost - a.cost)

            return {
                ...state,
                flowers: sortCostFlowersExpensive,
                bouquet: sortCostBouquetExpensive,
                isAuth: true
            }


        case Old_filter:
            return {
                ...state,
                bouquet: state.bouquet.sort((a, b) => new Date(a.dateExp) - new Date(b.dateExp)),
            }

        case YongFilter:
            return {
                ...state,

                bouquet: state.bouquet.sort((a, b) => new Date(b.dateExp) - new Date(a.dateExp)),
            }

        case Get_statistics:
            AllGetStatistics = []
            action.statistics.map(item => item.role === 'Супер Админ' ? null : AllGetStatistics.unshift(item))

            return {
                ...state,
                statistics: AllGetStatistics
            }

        case All_statistics:
            return {
                ...state,
                statistics: AllGetStatistics
            }

        case Statistics_Admin:
            Admin_Statistics = []
            AllGetStatistics.map(item => item.role !== 'Админ' ? null : Admin_Statistics.unshift(item))
            return {
                ...state,
                statistics: Admin_Statistics
            }
        case Statistics_Flowers:
            Flowers_Statistics = []
            AllGetStatistics.map(item => item.role !== 'Флорист' ? null : Flowers_Statistics.unshift(item))
            return {
                ...state,
                statistics: Flowers_Statistics
            }

        case Statistics_Courier:
            Courier_Statistics = []
            AllGetStatistics.map(item => item.role !== 'Курьер' ? null : Courier_Statistics.unshift(item))
            return {
                ...state,
                statistics: Courier_Statistics
            }

        case DiagramState:

            return {
                ...state,
                diagramState: action.diagramState
            }


        case SortDate:
            return {
                ...state,
                sortDate: action.sortDate
            }


        default:
            return state
    }
}

export default userReducer;


export const logout = () => ({ type: LOGOUT })


