import { toast } from 'react-toastify';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import BtnArrow from '../svg/BtnArrow';
import { Link, useNavigate } from 'react-router-dom';

interface FormData {
   email: string;
   password: string;
}

const LoginForm = () => {
   const navigate = useNavigate();

   // Validation schema using Yup
   const schema = yup
      .object({
         email: yup.string().required("Email is required").email("Invalid email format").label("Email"),
         password: yup.string().required("Password is required").label("Password"),
      })
      .required();

   const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
      resolver: yupResolver(schema),
   });

   // Function to handle form submission
   const onSubmit = async (data: FormData) => {
      try {
         // Send a POST request to the backend
         const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
         });

         const result = await response.json();

         if (response.ok) {
            // Show success notification
            toast.success('Login successfully', { position: 'top-center' });
            
            // Save token to localStorage or handle it as needed
            localStorage.setItem('token', result.token);

            // Navigate to the desired page (e.g., dashboard)
            navigate('/');
         } else {
            // Show error notification
            toast.error(result.message || 'Login failed', { position: 'top-center' });
         }
      } catch (error) {
         console.error('Error logging in:', error);
         toast.error('An error occurred. Please try again later.', { position: 'top-center' });
      }

      // Reset the form fields
      reset();
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)} className="account__form">
         <div className="form-grp">
            <label htmlFor="email">Email</label>
            <input id="email" {...register("email")} type="text" placeholder="email" />
            <p className="form_error">{errors.email?.message}</p>
         </div>
         <div className="form-grp">
            <label htmlFor="password">Password</label>
            <input id="password" {...register("password")} type="password" placeholder="password" />
            <p className="form_error">{errors.password?.message}</p>
         </div>
         <div className="account__check">
            <div className="account__check-remember">
               <input type="checkbox" className="form-check-input" value="" id="terms-check" />
               <label htmlFor="terms-check" className="form-check-label">Remember me</label>
            </div>
            <div className="account__check-forgot">
               <Link to="/forgot-password">Forgot Password?</Link>
            </div>
         </div>
         <button type="submit" className="btn btn-two arrow-btn">Sign In<BtnArrow /></button>
      </form>
   );
};

export default LoginForm;
