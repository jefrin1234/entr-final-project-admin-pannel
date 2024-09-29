import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setAdminDetails } from "../slices/adminSlice"
import { axiosInstance } from '../config/axiosInstance';

export default function App() {

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()


  const onSubmit = async (data) => {


    try {

      const response = await axiosInstance({
        method: 'POST',
        url: "/admin/login",
        data: data
      })

 

      if (response.data.success) {
        dispatch(setAdminDetails({ admin: response.data, loggedIn: true }))
        navigate('/')
        toast.success("Login success")

      }
    } catch (error) {
     
      toast.error("error logging in")
    }
  }


  return (
  
    <div className="min-h-screen flex flex-col justify-center items-center bg-green-500 px-4">
    
      <h1 className="text-5xl font-bold text-white mb-10">Trends</h1>

      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6"> Login to Admin pannel </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <input
              className="w-full px-4 py-3 border-b border-gray-300 focus:outline-none focus:border-green-600 transition duration-200"
              placeholder="Enter email"
              {...register("email", {
                required: "Email is required",

              })}
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div>
          <div>
            <input
              className="w-full px-4 py-3 border-b border-gray-300 focus:outline-none focus:border-green-600 transition duration-200"
              type="password"
              placeholder="Enter password"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },

              })}
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
          </div>
          <button className="bg-green-400 px-6 py-2 rounded" type="submit">
            Login
          </button>

        </form>

      </div>
    </div>


  )
}