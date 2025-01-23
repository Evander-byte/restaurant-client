import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import * as Yup from 'yup'
import { FirebaseContext } from '../../firebase'
import { useNavigate } from 'react-router'
import FileUploader from 'react-firebase-file-uploader'

const NewDish = () => {

  //state image
  const [upload, setUpload] = useState(false)
  const [progress, setProgress] = useState(0)
  const [urlImage, setUrlImage] = useState('')

  //Context whit firebase operations
  const { firebase } = useContext(FirebaseContext)

  // console.log(firebase)

  
  //Redirect Hook
  const navigate = useNavigate()
  // Validation and read data on the form
  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      category: '',
      photo: '',
      description: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
               .min(3, 'The dish must have at least three caracters.')
               .required('Name is required'),
      price: Yup.number()
                .min(1, 'The dish must cost $1')
                .required('Price is required'),
      category: Yup.string()
                .required('Select a dish category'),
      description: Yup.string()
                .min(10, 'The Description should be longer')
                .required()
    }), 
    onSubmit: data => {
      try {
        data.avalible = true
        data.photo = urlImage
        firebase.db.collection('products').add(data)
        navigate('/menu')
      } catch (error) {
        console.log(error)
      }
    }
  })

  //All about image
  const handleUploadStart = () => {
    setProgress(0)
    setUpload(true)

  }

  const handleUploadError = error => {
    setUpload(false)
    console.log(error);
  }

  const handleUploadSuccess = async (title) => {
    setProgress(100)
    setUpload(false)

    //save url destination
    const url = await firebase
                .storage
                .ref("product")
                .child(title)
                .getDownloadURL()
    console.log(url)
    setUrlImage(url)
  }

  const handleProgress = advance => {
    setProgress(advance)
    console.log(advance)
  }

  return (
    <>
      <h1 className="text-3xl font-light mb-4">Add a dish</h1>
      <div className="flex justify-center mt-10">
        <div className="w-full max-w-3xl">
          <form
            onSubmit={formik.handleSubmit}
          >
            {formik.touched.name && formik.errors.name 
              ? (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role='alert'>
                    <p className="font-bold">{formik.errors.name}</p>
                  </div>
                ) 
              : null
            }
            <div className="mb-4">
              <label 
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >Name</label>
              <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-none"
                type="text"
                id="name"
                placeholder="Name of dishe"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur} 
              />
            </div>
            {formik.touched.price && formik.errors.price 
              ? (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role='alert'>
                    <p className="font-bold">{formik.errors.price}</p>
                  </div>
                ) 
              : null
            }
            <div className="mb-4">
              <label 
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="price"
              >Price</label>
              <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-none"
                type="number"
                id="price"
                placeholder="$20"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}  
              />
            </div>
            {formik.touched.category && formik.errors.category 
              ? (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role='alert'>
                    <p className="font-bold">{formik.errors.category}</p>
                  </div>
                ) 
              : null
            }
            <div className="mb-4">
              <label 
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="category"
              >Category</label>
              <select 
                name="category" 
                id="category" 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-none"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur} 
              >
                <option value="">-- Select an option --</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Luch</option>
                <option value="dinner">Dinner</option>
                <option value="beverage">Beverage</option>
                <option value="dessert">Dessert</option>
                <option value="salad">Salad</option>
              </select>
            </div>
            <div className="mb-4">
              <label 
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="photo"
              >Photo</label>
              <FileUploader 
                accept="image/*"
                name="image"
                randomizeFilename
                storageRef={firebase.storage.ref("product")}
                onUploadStart={handleUploadStart}
                onUploadError={handleUploadError}
                onUploadSuccess={handleUploadSuccess}
                onProgress={handleProgress}
              />
            </div>
            {upload && (
              <div className="h-12 w-full border">
                <div className="bg-green-500 absolute left-0 top-0 text-white px-2 text-sm h-12 flex items-center" style={{width: `${progress}%`}}>{progress}%</div>
              </div>
            )}

            {urlImage && (
              <p className="bg-green-500 text-white p-3 text-center my-5">
                Successfull Charge
              </p>
            )}
            {formik.touched.description && formik.errors.description 
              ? (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role='alert'>
                    <p className="font-bold">{formik.errors.description}</p>
                  </div>
                ) 
              : null
            }
            <div className="mb-4">
              <label 
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >Description</label>
              <textarea 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-none h-40"
                id="description"
                placeholder="Write a description of the dish"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}  
              ></textarea>
            </div>
            <input 
              type="submit" 
              className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold"
              value="Add Dish" 
            />
          </form>
        </div>
      </div>
    </>
  )
}

export default NewDish