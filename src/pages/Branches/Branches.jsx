import { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import styles from './styles/branches.module.css'
import PlusIcon from './icon/plus.svg'
import { useSelector, useDispatch } from 'react-redux';
import jwt_decode from "jwt-decode";
import InfoFilials from '../../components/FilialsModal/InfoFilals/InfoFilials';
import AddNewFilials from '../../components/FilialsModal/AddNewFilials/AddNewFilials';
import { Get_filials } from '../../Logica/api/Filials';

import { Triangle } from 'react-loader-spinner'
import useTable from '../../components/PaginationTable/useTable';
import TableFooter from '../../components/PaginationTable/TableFooter';


function Branches({ rowsPerPage = 11 }) {

    let Token = localStorage.getItem('token')
    const decoded = jwt_decode(Token);

    const dispatch = useDispatch()
    const [page, setPage] = useState(1);
    const [isModalIsDataFilials, setModalIsDataFilials] = useState({ d: false, s: null })
    const [isAddNewIsFilials, setAddNewIsFilials] = useState(false)

    const user = useSelector(state => state.user)

    const { slice, range } = useTable(user.filials, page, rowsPerPage);


    useEffect(() => {
        dispatch(Get_filials())
    }, [])
    const handleOpenFilialModal = () => setAddNewIsFilials(true) // todo
    return (
        <div>
            <NavBar />

            {user.isAuth === false ? null :
                decoded.role === 'Супер Админ' ?
                    <div className={styles.add}>
                        <button className={styles.add__btn} onClick={handleOpenFilialModal} >
                            <img src={PlusIcon} className={styles.add__icon} alt='Not find icons' /> Добавить филиал </button>
                    </div> : null
            }

            <div className={styles.container} >
                {
                    user.filials.length === 0 ?
                        <div className={styles.spinner} >
                            <Triangle
                                color="#E73D53" height={110} width={110}

                            /> </div> :


                        <table className={styles.table} >
                            <thead>
                                <tr>
                                    <td className={styles.head}>&#8470;</td>
                                    <td className={styles.head} >Адрес</td>
                                    <td className={styles.head}> Номер телефона &nbsp;&nbsp;&nbsp;&nbsp;
                                        {/* todo */}
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                    <td className={styles.head}  >График работы &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </td>

                                </tr>
                            </thead>


                            <tbody className={styles.tbody} >

                                {
                                    slice.map((item, index) => (

                                        <tr className={styles.table__texst} key={item.id}
                                            onClick={() => setModalIsDataFilials({ d: true, s: item })} >
                                            <td className={styles.d}> {index + 1}</td>
                                            <td className={styles.d}>{item.address}</td>
                                            <td className={styles.d}>{item.phone} </td>
                                            <td className={styles.d}>{item.schedule}</td>


                                        </tr>
                                    ))
                                }


                            </tbody>
                        </table>
                }

                <AddNewFilials active={isAddNewIsFilials} setActive={setAddNewIsFilials} />
                {isModalIsDataFilials.s &&
                    decoded.role === 'Супер Админ' ? <InfoFilials active1={isModalIsDataFilials.s}
                        active={isModalIsDataFilials.d} setActive={setModalIsDataFilials} />
                    :
                    null}


            </div>
            {
                user.filials.length > 12 ? <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
                    : ''
            }


        </div>
    )
}

export default Branches;