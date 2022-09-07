import { useState } from "react";
import styles from './styles/AddNewCatalog.module.css';
import FlowerIcon from './icons/ion_flower-outline.svg';
import { DropDownListSalary, ListItemSmenaSalary } from './styles/TabsCss'
import ArrowDown from './icons/ArrowDown.svg';
import ArrowTop from './icons/ArrowUp.svg';
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Get_category, Add_Flowers } from '../../../Logica/api/Catalog'




function AddNewCatalog({ active, setActive }) {

  const dispatch = useDispatch();

  const [selectedImage, setSelectedImage] = useState(null);
  const [isOpenSalary, setIsOpenSalary] = useState(false);
  const [selectSalaryDays, setSelectSalaryDays] = useState('');

  const user = useSelector(state => state.user)



  const togglingSalary = () => setIsOpenSalary(!isOpenSalary)


  const onOptionClickedSalary = value => () => {

    setSelectSalaryDays(value)
    setIsOpenSalary(false)
  }
  let data = new FormData();

  function Clear(value) {
    value.id = ''
    value.name = ''
    value.grade = ''
    value.cost = ''
    value.quantity = ''
    value.description = ''
    value.shortDescription = 'Роза'
    value.image = setSelectedImage(null)
    value.category = setSelectSalaryDays('')
  }

  const close = () => {
    setActive(false)

  }


  const AddNewFilialsSchema = Yup.object().shape({
    name: Yup.string()
      .required('Обязательно'),
    grade: Yup.string()
      .required('Обязательно'),
    cost: Yup.string()
      .required('Обязательно'),
    quantity: Yup.string()
      .required('Обязательно'),

  })

  return (

    <div className={active ? styles.active : styles.modal}>
      <div className={styles.modal__content1}   >

        <Formik
          initialValues={{
            id: '',
            name: '',
            cost: '',
            description: '',
            shortDescription: '',
            image: '',
            category: '',
            quantity: '',
            grade: '',
            date: ''
          }}
          validationSchema={AddNewFilialsSchema}
          onSubmit={(values) => {
            data.append('name', values.name)
            data.append('cost', Number(values.cost))
            data.append('description', values.description)
            data.append('grade', values.grade)
            data.append('shortDescription', values.shortDescription)
            data.append('image', selectedImage, selectedImage.name)
            // new Date Local
            data.append('date', new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new
              Date().getDate())
            data.append('category', Number(selectSalaryDays.id))
            data.append('quantity', Number(values.quantity))


            dispatch(Add_Flowers(data, setActive))
            Clear(values)
            // setActive(false)

          }} >

          {({ errors, touched, values, handleChange }) => (

            <Form>
              <div className={styles.modal__content_photo}>


                {selectedImage == null ? <img width={"119px"} src={FlowerIcon} alt='' /> :
                  selectedImage && (
                    <img name="image" alt="not fount" width={"211px"} height={"195px"} style={{ borderRadius: "13px" }}
                      src={URL.createObjectURL(selectedImage)} />)}

                <input
                  type="file" id="image" name="image" style={{ visibility: "hidden" }}
                  onChange={(event) => {
                    setSelectedImage(event.target.files[0]);
                  }} />
                {selectedImage == null ? <label htmlFor="image" className={styles.modal__content_photo_texst}
                > Добавить картинку </label> :
                  <label htmlFor="image" className={styles.modal__content_photo_texst1} > Добавить </label>}



              </div>


              <div className={styles.content} >
                <div className={styles.modal__content_fo}>
                  <p className={styles.modal__content_Name}>Название товара</p>
                  <Field name='name' type='text' id=' name'
                    placeholder='Название' value={values.name} className={styles.modal__content_form_input} />
                  {errors.name && touched.name ? (
                    <div className={styles.errors} >{errors.name}</div>
                  ) : null}
                </div>



                <div className={styles.modal__content_fo}>
                  <p className={styles.modal__content_Name}>Сорт товара</p>
                  <Field name='grade' type='text' id='grade'
                    placeholder='Сорт, цвет' value={values.grade} className={styles.modal__content_form_input} />
                  {errors.grade && touched.grade ? (
                    <div className={styles.errors} >{errors.grade}</div>
                  ) : null}
                </div>

                <div className={styles.modal__content_fo}>
                  <p className={styles.modal__content_Name}>Цена</p>
                  <Field name='cost' id='cost' type='number' value={values.cost}
                    placeholder='000 сом ' className={styles.modal__content_form_input} />
                  {errors.cost && touched.cost ? (
                    <div className={styles.errors} >{errors.cost}</div>
                  ) : null}
                </div>


                <div className={styles.modal__content_fo}>
                  <p className={styles.modal__content_Name}>Количество</p>
                  <Field name='quantity' id='quantity' value={values.quantity}
                    placeholder='000 шт' type='number' className={styles.modal__content_form_input} />
                  {errors.quantity && touched.quantity ? (
                    <div className={styles.errors} >{errors.quantity}</div>
                  ) : null}
                </div>

                <div className={styles.modal__content_fo}>
                  <p className={styles.modal__content_Name}>Категории</p>


                  <div className={styles.DropDownContainerSalary} >
                    <div className={styles.DropDownHeader} onClick={togglingSalary}>
                      {isOpenSalary ? <img src={ArrowTop} alt='Not find ArrowDownIcon'
                        onClick={() => dispatch(Get_category())} className={styles.Arrow} />
                        :
                        <img src={ArrowDown} className={styles.Arrow}
                          onClick={() => dispatch(Get_category())} alt='Not find ArrowTopIcon' />}
                      {selectSalaryDays.text || "Еще не выбрано"}
                    </div >
                    {isOpenSalary && (
                      <div >
                        <DropDownListSalary className={styles.ListItemOdd} >
                          {user.categoryFlowers.map(option => (

                            <ListItemSmenaSalary onClick={onOptionClickedSalary(option)} key={Math.random()}>
                              {option.text}

                            </ListItemSmenaSalary >

                          ))}
                        </DropDownListSalary>

                      </div>
                    )}
                  </div>

                </div>




                <div className={styles.modal__content_fo}>
                  <p className={styles.modal__content_Name}>Описание</p>
                  <textarea name='description' id='description' onChange={handleChange}
                    value={values.description} className={styles.form__input1} />
                </div>

                <div className={styles.actions}>
                  <button type="submit" className={styles.actions__save} >Сохранить</button><br />
                  <div className={styles.actions__button} >
                    <button button='button' className={styles.actions__operations}
                      onClick={() => Clear(values)}  > Очистить</button>

                  </div>
                </div>


              </div>





            </Form>
          )}

        </Formik>
        <button button='button' className={styles.actions__operations1} onClick={() => close()} >Отмена </button>

      </div>

    </div>


  )
}
export default AddNewCatalog;