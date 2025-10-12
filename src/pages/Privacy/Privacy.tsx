import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { changePasswordSchema } from '../../schema/ChangePasswordSchema';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import type { RegisterUserType } from '../../types/Types';
import userService from '../../services/UserService';
import { toast } from 'react-toastify';
import { closeBackdrop, openBackdrop, setUser } from '../../redux/slice/appSlice';
import { setUpdateUser } from '../AccountDetails/setUpdateUser';

export default function Privacy() {

    const {user} = useSelector((state:RootState)=> state.app)
    const dispatch = useDispatch()

    const submit = async (values:any ,actions:any  ) => {
        if(values.oldPassword === user?.password){
            // Başarılı
            let payload : Partial<RegisterUserType> = {
                id : user?.id,
                firstName : user?.firstName,
                lastName:user?.lastName,
                username : user?.username,
                eposta : user?.eposta,
                age : user?.age,
                gender:user?.gender,
                token : user?.token,
                isAdmin : user?.isAdmin,
                password : values.newPassword,
                passwordrepetition : values.newPassword
            }
           try {
            dispatch(openBackdrop())
             let response : RegisterUserType = await userService.updateUser(payload)
             if(response){
                toast.success("Şifreniz Başarıyla Değiştirildi")
                localStorage.removeItem("user")
                setUpdateUser(response)
                dispatch(setUser(response))
                actions.resetForm()
             }
           } catch (error:any) {
            toast.error(`Şifre Değiştirilirken Hata Oluştu ${error.message}`)
            
           }
           finally{
             dispatch(closeBackdrop())

           }
        }
        else{
            // Başarısız
            toast.error("Şifre Yanlış")
        }
    }

     const {values,handleChange , handleBlur,errors,handleSubmit,touched} = useFormik({
     initialValues: {
       oldPassword : '',
       newPassword: '',
       newPasswordRepeat: '',
     },
     validationSchema : changePasswordSchema
     ,

     onSubmit: submit
   });
  return (
    <div className='h-full flex justify-center items-center'>

        <form onSubmit={handleSubmit} className='bg-[#dfe6e9] w-5/6 md:w-1/2 h-4/6 flex justify-center items-center rounded-lg shadow-lg box-content !p-3'>
        <div>
            <div>
                <TextField name='oldPassword' value={values.oldPassword} onChange={handleChange} onBlur={handleBlur} type='password' label="Eski Şifre" variant="outlined"
                helperText={ (user?.password !== values.oldPassword || errors.oldPassword ) && touched.oldPassword && (errors.oldPassword ? <span className='text-red-600 '>{errors.oldPassword}</span>: <span className='text-red-600 '>Şifreniz Yanlıştır</span> )  }
                />
            </div>
              <div className='!mt-4'>
                <TextField name='newPassword' value={values.newPassword} onChange={handleChange} onBlur={handleBlur} type='password' label="Yeni Şifre" variant="outlined" 
                helperText={errors.newPassword && touched.newPassword && <span className='text-red-600 '>{errors.newPassword}</span>}
                />
            </div>
              <div  className='!mt-4'>
                <TextField name='newPasswordRepeat' value={values.newPasswordRepeat} onChange={handleChange} onBlur={handleBlur} type='password' label="Tekrardan Yeni Şifre" variant="outlined" 
                 helperText={errors.newPasswordRepeat && touched.newPasswordRepeat && <span className='text-red-600 '>{errors.newPasswordRepeat}</span>}
                />
            </div>
            <div className='!mt-4 flex justify-center items-center'>
                <Button type='submit' sx={{textTransform:"none"}} variant='contained' > Değiştir </Button>
            </div>
        </div>
        </form>
        
    </div>
  )
}
