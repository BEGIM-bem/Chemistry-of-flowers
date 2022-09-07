import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { Tab, DropDownListSalary, ListItemSmenaSalary } from './styles/TabCss';
import stylesTabs from './styles/SwitchBetweenTabs.module.css'
import stylesContent from './styles/Content.module.css';
import SearchIcon from './icon/search.svg';
import ArrowDown from './icon/ArrowDown.svg';
import ArrowTop from './icon/ArrowUp.svg';
import MoreVertIcon from './icon/Tozki.svg';
import AddNewCatalogIcon from './icon/add.svg'
import PlusIcon from './icon/plus.svg';
import IconFilter from './icon/Group.svg';
import { useDispatch, useSelector } from 'react-redux';
import CatalogSection from "../../components/CatalogModal/CatalogSection/CatalogSection";
import AcortimentProduct from "../../components/CatalogModal/AcortimentProduct/AcortimentProduct";
import AddNewCatalog from "../../components/CatalogModal/AddNewCatalog/AddNewCatalog";
import { Add_category, Get_category, Delete_category, Get_CategoryBouquets } from '../../Logica/api/Catalog'
import {
  Add_categoryBouquet, Get_flowers, Delete_BouquetCategory, EditCategoryBouquet,
  SearchFlowers, SearchBouquet, EditCategoryFlowers, Get_Bouquet
} from '../../Logica/api/Catalog'
import { useNavigate } from "react-router-dom";
import { Old_filter, PoolFilter, ExpensiveFilter, YongFilter } from '../../Logica/reducers/userReducer'



function Cat() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Get_Bouquet())
    dispatch(Get_category())
    dispatch(Get_flowers())
    dispatch(Get_CategoryBouquets())


  }, [])

  const user = useSelector(state => state.user)


  const TabName = ['Каталог', 'Ассортимент товаров']
  const [active, setActive] = useState(TabName[0])


  // const [categoryFlowers, setCategoryFlowers] = useState(null)
  // const [categoryBouquet, setCategoryBouquet] = useState(null)

  const [isOpenSalary, setIsOpenSalary] = useState(false)

  const [isOpenFilter, setIsOpenFilter] = useState(false)
  const [isCategoryNewAdd, setCategoryNewAdd] = useState(false)
  const [valueNewCategory, setValueNewCategory] = useState('')


  const [isModalCatalogSection, setModalCatalogSection] = useState({ isOpen: false, content: null })
  const [isAddNewCatalogModal, setAddNewCatalogModal] = useState(false)
  const [changeModalLine, setChangeModalLine] = useState(true)
  const [isSeeAddModal, setSeeModal] = useState(false)
  const [isEditCategory, setEditCategory] = useState(false)

  const [searchValue, setSearchValue] = useState('')
  const [searchValueBouquet, setsearchValueBouquet] = useState('')
  const [editValue, setEditValue] = useState('')


  const togglingSalary = () => {
    setIsOpenSalary(!isOpenSalary)
  }
  const togglelingFilter = () => setIsOpenFilter(!isOpenFilter)



  function FlowersCategory() {
    dispatch(Add_category(valueNewCategory))

    setValueNewCategory('')
    setCategoryNewAdd(false)

  }

  function BouquetCategory() {
    dispatch(Add_categoryBouquet(valueNewCategory))
    setValueNewCategory('')
    setCategoryNewAdd(false)
  }


  function EditFlowers(value) {
    setEditCategory(true)
    setEditValue(value)
  }

  function EditFlowerSend() {
    dispatch(EditCategoryFlowers(editValue.id, editValue.text))
    setEditValue('')
    setEditCategory(false)
  }

  function EditBouquet(value) {
    setEditCategory(true)
    setEditValue(value)
  }

  function EditBouquetSend() {
    dispatch(EditCategoryBouquet(editValue.id, editValue.text))
    setEditValue('')
    setEditCategory(false)
  }

  function searchProduct(e) {
    setSearchValue(e.target.value)
    dispatch(SearchFlowers(e.target.value))
  }
  function searchBouquet(e) {
    setsearchValueBouquet(e.target.value)
    dispatch(SearchBouquet(e.target.value))
  }

  function onTabClick(type) {
    setActive(type)
    if (type === 'Каталог') {
      setSeeModal(false)
      setChangeModalLine(true)
    }
    else if (type === 'Ассортимент товаров') {
      setSeeModal(true)
      setChangeModalLine(false)
    }

  }

  const categoryOpen = () => setCategoryNewAdd(true)
  const categoryNewAdd = (e) => setValueNewCategory(e.target.value)
  const EditValues = () => EditFlowerSend()
  const ChangeValue = (e) => setEditValue({ text: e.target.value, id: editValue.id })
  const ChangeS = (e) => setValueNewCategory(e.target.value)

  // const onOptionSalaryBouquet = value => () => { setCategoryBouquet(value.text) }
  // const onOptionSalaryFlowers = value => () => { setCategoryFlowers(value.text) }


  return (
    <div className={stylesTabs.Catalog}>
      <NavBar />

      <div className={stylesTabs.ALL} >
        <div className={stylesTabs.ButtonNavigations} >
          {TabName.map(type => (
            <Tab key={type} className={stylesTabs.Tabs__texst} active={active === type}
              onClick={() => onTabClick(type)} >{type}</Tab>
          ))}
        </div>

        {
          isSeeAddModal ?
            <div className={stylesTabs.search} >
              <input type="text" className={stylesTabs.search__input} value={searchValue}
                onChange={searchProduct}
                placeholder="Поиск" />
              <img className={stylesTabs.search__icon} src={SearchIcon} alt='Not find Icon Search' />
            </div>
            :
            <div className={stylesTabs.search} >
              <input type="text" className={stylesTabs.search__input} value={searchValueBouquet}
                onChange={searchBouquet} placeholder="Поиск" />
              <img className={stylesTabs.search__icon} src={SearchIcon} alt='Not find Icon Search' />
            </div>
        }



        {isSeeAddModal ?

          <div className={stylesTabs.DropDownContainerSalary} >
            <div className={stylesTabs.DropDownHeader} onClick={togglingSalary}>
              {isOpenSalary ? <img src={ArrowTop} alt='Not find ArrowDownIcon' className={stylesTabs.Arrow} />
                :
                <img src={ArrowDown} className={stylesTabs.Arrow} alt='Not find ArrowTopIcon' />}
              {<input defaultValue='Категории' readOnly className={stylesTabs.input} />}
            </div >
            {
              isOpenSalary && (
                <div>
                  <DropDownListSalary  >
                    {
                      user.categoryFlowers.map(option => (
                        <div>

                          <ListItemSmenaSalary key={Math.random()}>
                            {option.text}
                          </ListItemSmenaSalary >

                          <div className={stylesTabs.treePoint}>
                            <img src={MoreVertIcon} alt='not find icon' className={stylesTabs.dropbtn} />

                            <div className={stylesTabs.dropdownContent}>
                              <button type='button' className={stylesTabs.dropdownContent__button}
                                onClick={() => dispatch(Delete_category(option.id))} >Удалить</button>
                              <button type='button' className={stylesTabs.dropdownContent__button}
                                onClick={() => EditFlowers(option)} >Редактировать</button>

                            </div>
                          </div>
                        </div>

                      ))}
                    {isCategoryNewAdd ? <button style={{ display: 'none' }} onClick={categoryOpen}
                      className={stylesTabs.addNewCatalogs}>Добавить категорию <img alt='not find icon'
                        className={stylesTabs.addNewCatalogsIcon} src={AddNewCatalogIcon} /> </button>
                      :
                      <button onClick={() => setCategoryNewAdd(true)} className={stylesTabs.addNewCatalogs}>Добавить категорию
                        <img alt='not find icon' className={stylesTabs.addNewCatalogsIcon} src={AddNewCatalogIcon} /> </button>
                    }


                    {isCategoryNewAdd ? <div className={stylesTabs.addNew} >
                      <input type='texst' placeholder="Название" value={valueNewCategory} onChange={categoryNewAdd}
                        className={stylesTabs.CategoryNewAdd__input} />
                      {valueNewCategory.length > 0 ? <button className={stylesTabs.categoryNewAdd__button1}
                        type='button' onClick={() => FlowersCategory()} >Потвердить</button> :
                        <button className={stylesTabs.categoryNewAdd__button}  >Потвердить</button>
                      }

                    </div> : ''}

                    {
                      isEditCategory ?
                        <div className={stylesTabs.addNew} >
                          <input type='texst' placeholder="Название" value={editValue.text}
                            onChange={(e) => setEditValue({ text: e.target.value, id: editValue.id })} className={stylesTabs.CategoryNewAdd__input} />
                          <button className={stylesTabs.categoryNewAdd__button1} onClick={EditValues} type='button' >Потвердить</button>
                          :
                        </div> : ''
                    }


                  </DropDownListSalary>
                </div>
              )}
          </div> :


          <div className={stylesTabs.DropDownContainerSalary} >
            <div className={stylesTabs.DropDownHeader} onClick={togglingSalary}>
              {isOpenSalary ? <img src={ArrowTop} alt='Not find ArrowDownIcon' className={stylesTabs.Arrow} /> :
                <img src={ArrowDown} className={stylesTabs.Arrow} alt='Not find ArrowTopIcon' />}
              {<input defaultValue='Категории' readOnly className={stylesTabs.input} />}
            </div >
            {
              isOpenSalary && (
                <div>
                  <DropDownListSalary>
                    {
                      user.categoryBouquet.map(option => (
                        <div>

                          <ListItemSmenaSalary key={Math.random()}>
                            {option.text}
                          </ListItemSmenaSalary >
                          <div className={stylesTabs.treePoint}>
                            <img src={MoreVertIcon} alt='not find icon' className={stylesTabs.dropbtn} />

                            <div className={stylesTabs.dropdownContent}>
                              <button type='button' className={stylesTabs.dropdownContent__button}
                                onClick={() => dispatch(Delete_BouquetCategory(option.id))} >Удалить</button>
                              <button type='button' className={stylesTabs.dropdownContent__button}
                                onClick={() => EditBouquet(option)}  >Редактировать</button>

                            </div>
                          </div>
                        </div>

                      ))}
                    {isCategoryNewAdd ? <button style={{ display: 'none' }} onClick={() => setCategoryNewAdd(true)}
                      className={stylesTabs.addNewCatalogs}>Добавить категорию <img alt='not find icon'
                        className={stylesTabs.addNewCatalogsIcon} src={AddNewCatalogIcon} /> </button>
                      :
                      <button onClick={() => setCategoryNewAdd(true)} className={stylesTabs.addNewCatalogs}>
                        Добавить категорию <img alt='not find icon' className={stylesTabs.addNewCatalogsIcon} src={AddNewCatalogIcon} /> </button>}


                    {isCategoryNewAdd ? <div>
                      <input type="text" placeholder="Название" value={valueNewCategory}
                        onChange={ChangeS} className={stylesTabs.CategoryNewAdd__input} />

                      {
                        valueNewCategory.length > 0 ? <button className={stylesTabs.categoryNewAdd__button1}
                          type='button' onClick={BouquetCategory} >Потвердить</button> :
                          <button className={stylesTabs.categoryNewAdd__button}  >Потвердить</button>
                      }

                    </div> : ''}

                    {
                      isEditCategory ?
                        <div>
                          <input type="text" placeholder="Название" value={editValue.text}
                            onChange={ChangeValue} className={stylesTabs.CategoryNewAdd__input} />
                          <button className={stylesTabs.categoryNewAdd__button1}
                            onClick={EditBouquetSend} type='button' >Потвердить</button>
                          :
                        </div> : ''
                    }

                  </DropDownListSalary>
                </div>
              )}
          </div>


        }


        {isSeeAddModal ?
          <button onClick={() => setAddNewCatalogModal(true)} className={stylesTabs.AddFlowers_btn}>
            Добавить<img className={stylesTabs.AddFlowers_icon} src={PlusIcon} alt='not find icon' /> </button>
          :
          <button style={{ visibility: 'hidden' }} className={stylesTabs.AddFlowers_btn}>Добавить
            <img className={stylesTabs.AddFlowers_icon} alt='not find icon' src={PlusIcon} /> </button>}
        <div className={stylesTabs.DropDownContainerFilter} >


          <div className={stylesTabs.DropDownHeader} onClick={togglelingFilter}>
            <img className={stylesTabs.DropDownHeader__icon} src={IconFilter} alt='Not find Icon' />
          </div>
          {isOpenFilter && (
            <div  >
              {isSeeAddModal ?
                <ul className={stylesTabs.DropDownListContainer1} >
                  <li className={stylesTabs.ListItemSmenaSalary} onClick={() => dispatch({ type: PoolFilter })} >Сначала дешевые</li >
                  <li className={stylesTabs.ListItemSmenaSalary} onClick={() => dispatch({ type: ExpensiveFilter })} > &nbsp;&nbsp;Сначала дорогие</li >
                </ul> :
                <ul className={stylesTabs.DropDownListContainer1} >
                  <li className={stylesTabs.ListItemSmenaSalary} onClick={() => dispatch({ type: Old_filter })} >&nbsp;&nbsp;&nbsp;&nbsp;Сначала старые</li >
                  <li className={stylesTabs.ListItemSmenaSalary} onClick={() => dispatch({ type: YongFilter })} >&nbsp;&nbsp;&nbsp;&nbsp; Сначала новые</li >

                  <li className={stylesTabs.ListItemSmenaSalary} onClick={() => dispatch({ type: PoolFilter })} >Сначала дешевые</li >
                  <li className={stylesTabs.ListItemSmenaSalary} onClick={() => dispatch({ type: ExpensiveFilter })} > &nbsp;&nbsp;Сначала дорогие</li >
                </ul>
              }
            </div>
          )}
        </div></div>

      {isSeeAddModal ?
        user.flowers.length === 0 ?
          <p className={stylesContent.NotFind} > Данный товар не найден </p>
          : <div className={stylesContent.content} >
            {

              user.flowers.map(item => (
                <div onClick={() => setModalCatalogSection({ isOpen: true, content: item })}
                  className={stylesContent.conteinerData} key={item.id} >
                  <img src={item.image} alt='Not find Icon' className={stylesContent.contentData__photo} />
                  <div>
                    <h1 className={stylesContent.conteinerData__title}>{item.name}</h1>
                    <p className={stylesContent.conteinerData__filials}>{item.grade} </p>
                    <p className={stylesContent.conteinerData__texstLifeFlowers}>Количество: {item.quantity} </p>
                  </div>

                  <button className={stylesContent.conteinerData__btn}>{item.cost} сом</button>

                </div>
              ))} </div>
        : user.bouquet.length === 0 ? <p className={stylesContent.NotFind} >Данный товар не найден  </p>
          : <div className={stylesContent.content} >
            {user.bouquet.map(item => (
              <div onClick={() => setModalCatalogSection({ isOpen: true, content: item })}
                className={stylesContent.conteinerData} key={item.id} >
                <img src={item.image} alt='Not find Icon' className={stylesContent.contentData__photo} />
                <div>
                  <h1 className={stylesContent.conteinerData__title}>{item.name}</h1>
                  <p className={stylesContent.conteinerData__filials}>{item.filial.address}</p>
                  <p className={stylesContent.conteinerData__texstLifeFlowers} >Срок до  {[new Date(item.dateExp).getDate(), new Date(item.dateExp).getMonth() + 1,
                  new Date(item.dateExp).getFullYear()].map(x => { return x < 10 ? "0" + x : x }).join(".")}
                  </p>
                </div>


                <button className={stylesContent.conteinerData__btn}>{item.cost} сом</button>

              </div>
            ))}
          </div>


      }

      {isModalCatalogSection.content === null ? null
        : changeModalLine ?
          <CatalogSection active={isModalCatalogSection.isOpen} content={isModalCatalogSection.content}
            setActive={setModalCatalogSection} /> :
          <AcortimentProduct content={isModalCatalogSection.content} active={isModalCatalogSection.isOpen}
            setActive={setModalCatalogSection} />}

      <AddNewCatalog
        active={isAddNewCatalogModal} setActive={setAddNewCatalogModal} />
    </div>


  )

}

export default Cat;
