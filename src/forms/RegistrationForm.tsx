import { toast } from 'react-toastify';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import BtnArrow from '../svg/BtnArrow';
import { useNavigate } from 'react-router-dom';

interface FormData {
   fname: string;
   lname: string;
   email: string;
   password: string;
   cpassword: string;
}

const schema = yup
   .object({
      fname: yup.string().required().label("Name"),
      lname: yup.string().required().label("Name"),
      email: yup.string().required().email().label("Email"),
      password: yup.string().required().min(6).label("Password"), // Ensuring password is at least 6 characters
      cpassword: yup
         .string()
         .required()
         .oneOf([yup.ref('password')], 'Passwords must match') // Ensure passwords match
         .label("Confirm Password"),
   })
   .required();

const RegistrationForm = () => {
   const navigate = useNavigate();
   const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
      resolver: yupResolver(schema),
   });

   const onSubmit = async (data: FormData) => {
      try {
         // Send a POST request to your backend
         const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               firstName: data.fname,
               lastName: data.lname,
               email: data.email,
               password: data.password,
            })
            
            ,
         });

         // Handle the response
         if (response.ok) {
            const result = await response.json();
            toast.success('Registration successful', { position: 'top-center' });
            navigate('/login');
            reset(); // Reset the form after successful submission
         } else {
            const errorData = await response.json();
            toast.error(errorData.message || 'Registration failed', { position: 'top-center' });
         }
      } catch (error) {
         console.error('Error during registration:', error);
         toast.error('An error occurred. Please try again later.', { position: 'top-center' });
      }
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)} className="account__form">
         <div className="row gutter-20">
            <div className="col-md-6">
               <div className="form-grp">
                  <label htmlFor="fast-name">First Name</label>
                  <input type="text" {...register("fname")} id="fast-name" placeholder="First Name" />
                  <p className="form_error">{errors.fname?.message}</p>
               </div>
            </div>
            <div className="col-md-6">
               <div className="form-grp">
                  <label htmlFor="last-name">Last name</label>
                  <input type="text" {...register("lname")} id="last-name" placeholder="Last name" />
                  <p className="form_error">{errors.lname?.message}</p>
               </div>
            </div>
         </div>
         <div className="form-grp">
            <label htmlFor="email">Email</label>
            <input type="email" {...register("email")} id="email" placeholder="email" />
            <p className="form_error">{errors.email?.message}</p>
         </div>
         <div className="form-grp">
            <label htmlFor="password">Password</label>
            <input type="password" {...register("password")} id="password" placeholder="password" />
            <p className="form_error">{errors.password?.message}</p>
         </div>
         <div className="form-grp">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="password" {...register("cpassword")} id="confirm-password" placeholder="Confirm Password" />
            <p className="form_error">{errors.cpassword?.message}</p>
         </div>
         <button type="submit" className="btn btn-two arrow-btn">
            Sign Up
            <BtnArrow />
         </button>
      </form>
   );
}

export default RegistrationForm;
