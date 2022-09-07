import { useEffect, useState } from 'react';
import styles from './styles/Statistics.module.css';
import NavBar from "../../components/NavBar/NavBar";
import ArrowDown from './icons/ArrowDown.svg';
import ArrowTop from './icons/ArrowUp.svg';
import { Tab, DropDownListSalary, ListItemSmenaSalary } from './styles/TabCss';
import SearchIcon from './icons/search.svg';

import Book from './Turn';
import { Triangle } from 'react-loader-spinner'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip

} from "recharts";
import { useSelector, useDispatch } from 'react-redux';
import { Diagram, EmloyessSalary, Get_AllStatistics, SearchEmloyessGet } from '../../Logica/api/Statistics';
import { All_statistics, Statistics_Admin, Statistics_Courier, Statistics_Flowers } from '../../Logica/reducers/userReducer';


function Statistics() {
  const TabТame = ["Все", "Админы", "Флористы", "Курьеры"]
  const [active, setActive] = useState(TabТame[0])
  const [isOpenSalary, setIsOpenSalary] = useState(false);
  const [selectSalaryDays, setSelectSalaryDays] = useState(null);

  const salaryDays = ['Cегодня', 'Вчера', 'Последние 7 дней', 'Последние 30 дней',
    'Последние 90 дней', 'Последние 6 месяцев'];

  const [EmloyesValues, setSearchEmloyes] = useState('')
  const [ObjectDate, setObjectDate] = useState({})

  const [selectedAnswer, setAnswer] = useState({ name: 'Выберите сотрудника' });
  const togglingSalary = () => {
    setIsOpenSalary(!isOpenSalary)

  }

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const onOptionClickedSalary = value => () => {
    setIsOpenSalary(false)
    setSelectSalaryDays(value)


    if (value === 'Cегодня') {
      dispatch(EmloyessSalary(selectedAnswer.id, 1))
      setObjectDate(user.sortDate)

    }
    else if (value === 'Вчера') {
      dispatch(EmloyessSalary(selectedAnswer.id, 2))
      setObjectDate(user.sortDate)

    }
    else if (value === 'Последние 7 дней') {
      dispatch(EmloyessSalary(selectedAnswer.id, 8))
      setObjectDate(user.sortDate)

    }
    else if (value === 'Последние 30 дней') {
      dispatch(EmloyessSalary(selectedAnswer.id, 31))
      setObjectDate(user.sortDate)

    }
    else if (value === 'Последние 90 дней') {
      dispatch(EmloyessSalary(selectedAnswer.id, 91))
      setObjectDate(user.sortDate)

    }
    else if (value === 'Последние 6 месяцев') {
      dispatch(EmloyessSalary(selectedAnswer.id, 181))
      setObjectDate(user.sortDate)

    }
  }



  useEffect(() => {
    dispatch(Get_AllStatistics())

  }, [])

  function onTabClick(type) {
    setActive(type)
    setAnswer({ name: 'Выберите сотрудника' })
    if (type === 'Все') {
      // setActive('Все')
      // setAnswer({ name: 'Выберите сотрудника' })
      dispatch({ type: All_statistics })

    }
    else if (type === 'Админы') {
      // setActive('Админы')
      // setAnswer({ name: 'Выберите сотрудника' })
      dispatch({ type: Statistics_Admin })
    }
    else if (type === 'Флористы') {
      // setActive('Флористы')
      // setAnswer({ name: 'Выберите сотрудника' })
      dispatch({ type: Statistics_Flowers })

    }
    else if (type === 'Курьеры') {
      // setActive('Курьеры')
      // setAnswer({ name: 'Выберите сотрудника' })
      dispatch({ type: Statistics_Courier })

    }

  }

  function SearchEmloyess(e) {
    setSearchEmloyes(e.target.value)
    dispatch(SearchEmloyessGet(e.target.value))
  }



  return (
    <div className={styles.Statistics} >

      <NavBar />
      <div className={styles.navigations} >
        <div className={styles.ButtonNavigations} >
          {TabТame.map(type => (
            <Tab key={type} active={active === type} onClick={() => onTabClick(type)} >{type}</Tab>
          ))}
        </div>

        <div className={styles.search} >
          <input type="text" values={EmloyesValues} onChange={(e) => SearchEmloyess(e)}
            className={styles.search__input} placeholder="Поиск" />
          <img className={styles.search__icon} src={SearchIcon} alt='Not find Icon Search' /></div>
      </div>
      {
        user.statistics.length === 0 ?
          <div className={styles.spinner} >
            <Triangle
              color="#E73D53" height={110} width={110}

            /> </div> :

          <div className={styles.content}>


            <ul style={{ width: "330px", height: "462px", overflowY: "scroll" }} className={styles.ListItemOdd}>
              <p className={styles.content__head}> Имя пользователя</p>

              {user.statistics.map((name, id) => (

                <div>
                  <Book
                    key={name.id}
                    name={name}
                    onClick={item => {
                      setSelectSalaryDays(null)
                      setAnswer(item)
                      dispatch(Diagram(item.id))
                      setObjectDate(item)

                    }}
                    selectedChoice={selectedAnswer}
                  />

                </div>
              ))

              } </ul>

            <div className={styles.Conteiner}>
              <h1 className={styles.Conteiner__name} > {selectedAnswer.name} {selectedAnswer.surname} </h1>

              <div className={styles.DropDownContainerSalary1} >   Дни </div>


              <BarChart
                width={475}
                height={350}
                data={user.diagramState}
                className={styles.BarChart}

                margin={{
                  top: 1,
                  right: 10,
                  left: 20,
                  bottom: 10
                }}
                barSize={30}
              >
                <XAxis dataKey="name" scale="point"
                  padding={{ left: 40, right: 40 }} />
                <YAxis />
                <Tooltip styles={{ background: "red" }} />

                <Bar dataKey="Сумма" fill="#8884d8" />
              </BarChart>


            </div>

            <div className={styles.salary}>


              <div className={styles.DropDownHeader} onClick={togglingSalary}>
                {
                  isOpenSalary ? <img src={ArrowTop} alt='Not find ArrowDownIcon' className={styles.Arrow} />
                    :
                    <img src={ArrowDown} className={styles.Arrow} alt='Not find ArrowTopIcon' />
                }

                {selectSalaryDays || "Заработок"}
              </div >
              {isOpenSalary && (
                <div>
                  <DropDownListSalary>
                    {salaryDays.map(option => (

                      <ListItemSmenaSalary onClick={onOptionClickedSalary(option)} key={Math.random()}>
                        {option}

                      </ListItemSmenaSalary >

                    ))}
                  </DropDownListSalary>

                </div>
              )}

              <div className={isOpenSalary ? styles.disabel : ''} >
                <div className={styles.salary__info1} >
                  <p className={styles.salary__texst} >Количество выполненных <br /> заказов </p>
                  <p className={styles.salary__numbers}> {ObjectDate.kolichestvo === 0 ? 1 : ObjectDate.kolichestvo} </p>
                </div>

                <div className={styles.salary__info} >
                  <p className={styles.salary__texst}  >Выручка </p>
                  <p className={styles.salary__numbers}>{ObjectDate.vyruchka} </p>
                </div>

                <div className={styles.salary__info} >
                  <p className={styles.salary__texst} >Оклад сотрудника </p>
                  <p className={styles.salary__numbers} >{ObjectDate.salary} </p>
                </div>

                <div className={styles.salary__info} >
                  <p className={styles.salary__texst}  >Проценты </p>
                  <p className={styles.salary__numbers} >{ObjectDate.percent}</p>
                </div>

                <div className={styles.salary__info} >
                  <p className={styles.salary__texst} >Общая сумма заработка</p>
                  <p className={styles.salary__numbers}>{ObjectDate.totalSalary} </p>
                </div>

              </div>



            </div>


          </div>
      }

    </div>


  )
}

export default Statistics;