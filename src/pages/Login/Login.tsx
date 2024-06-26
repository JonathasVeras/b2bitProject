import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import b2bitLogo from '../../assets/logo/b2bit_png.png';
import { loginUserApi } from "../../services/loginAPI";
import { useNavigate } from "react-router-dom";
import ModalAlert from "../../components/ModalAlert/ModalAlert";
import { IoIosAlert } from "react-icons/io";
import Loading from "../../components/Loading/Loading";

export interface IFormValues {
  email: string;
  password: string;
}

interface IFormErrors {
  email?: string;
  password?: string;
}

interface IResponse {
  success: boolean;
  data: any;
  status: number;
}

export const fieldsStyle: string = "border-2 m-2 p-2 rounded-md bg-[#F1F1F1]";

export const TitleFieldStyle: string = "flex text-md font-semibold text-left";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showModalError, setShowModalError] = useState<boolean>(false);
  const [responseLogin, setResponseLogin] = useState<IResponse>({
    success: false,
    data: '',
    status: 0,
  })
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleeModalError = () => {
    setShowModalError(!showModalError);
  };

  const goToProfile = () => {
    navigate("/b2bitProject/profile");
  }
  return (
    <div className="flex items-center justify-center text-center h-screen bg-[#FAFAFA]">
      <div className="shadow-xl p-4 rounded-xl">
        <img src={b2bitLogo} className="m-4"></img>
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={values => {
            const errors: IFormErrors = {};
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            return errors;
          }}
          onSubmit={async (
            values: IFormValues,
            { setSubmitting }: FormikHelpers<IFormValues>
          ) => {
            setTimeout(async () => {
              setIsLoading(true)
              const response: IResponse = await loginUserApi(values);
              setResponseLogin(response)
              if (response.success) {
                goToProfile();
              }
              else {
                setShowModalError(true)
              }
              setSubmitting(false);
              setIsLoading(false)
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="sm:flex sm:flex-col sm:text-left">
              <div className="sm:flex sm:flex-col mb-2">
                <label
                  htmlFor="email"
                  className={TitleFieldStyle}
                >
                  E-mail
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="@gmail.com"
                  className={fieldsStyle} />
                <ErrorMessage name="email" component="div" />
              </div>
              <div className="sm:flex sm:flex-col mb-2">
                <label
                  htmlFor="password"
                  className={TitleFieldStyle}
                >
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  placeholder="*****************"
                  className={fieldsStyle}
                />
                <ErrorMessage name="password" component="div" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="
                  bg-[#02274F] 
                  p-2 
                  text-white 
                  rounded-xl 
                  font-semibold 
                  mt-4
                "
              >
                Sign In
              </button>
            </Form>
          )}
        </Formik>
      </div>
      {showModalError && (
        <ModalAlert
          title={`Failed to log in (${responseLogin.status})`}
          message={responseLogin.data}
          icon={<span className="text-red-500"><IoIosAlert size={30} /></span>}
          onClose={handleeModalError}
        />
      )}
      <Loading isLoading={isLoading} />
    </div>
  );
}

export default Login;
