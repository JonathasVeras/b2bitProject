import React from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';

interface FormValues {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export const fieldsStyle: String = "border-2 border-black m-2 rounded-md";


const Login: React.FC = () => {
    return (
        <div>
            <Formik
              initialValues={{ email: '', password: '' }}
              validate={values => {
                const errors: FormErrors = {};
                if (!values.email) {
                  errors.email = 'Required';
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = 'Invalid email address';
                }
                return errors;
              }}
              onSubmit={(values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 400);
              }}
            >
              {({ isSubmitting }) => (
                <Form className="sm:flex sm:flex-col sm:justify-center sm:items-center">
                  <Field type="email" name="email"  className={fieldsStyle}/>
                  <ErrorMessage name="email" component="div" />
                  <Field type="password" name="password" className={fieldsStyle}/>
                  <ErrorMessage name="password" component="div" />
                  <button type="submit" disabled={isSubmitting}>
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
        </div>
    );
}

export default Login;
