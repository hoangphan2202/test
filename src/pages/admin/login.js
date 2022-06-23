import { useState } from 'react'
import { FiEye, FiEyeOff, FiLock, FiUnlock, FiUser } from 'react-icons/fi'
import { Controller, useForm } from 'react-hook-form'
import usersApi from 'api/usersApi'
import { ADMIN_TOKEN } from 'utils/storage'
import { showToastError, showToastSuccess } from 'components/CustomToast/CustomToast'
import { useUser } from '../../store/user/hook'
import { useRouter } from 'next/router'
import Button from '../../components/Button/Button'
import StarFall from '../../components/StarFall/StarFall'
import Container from 'components/Container/Container'
import ContainerLayout from '../../components/Container/ContainerLayout'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const user = useUser()

  if (user?._id) {
    router.push('/admin')
  }

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm()

  const FORM_INPUT = [
    {
      id: 'username',
      name: 'username',
      label: 'Tên đăng nhập',
      rules: {
        required: 'Nhập thông tin',
      },
      className: 'mb-2',
      classNameInput: `py-4 pl-16 bg-transparent rounded-xl sm:w-[500px] border border-primaryYellow focus:outline-none ${
        errors?.['email']?.message ? '!border-red-400' : ''
      }`,
      placeholder: 'Tên đăng nhập',
      type: 'text',
      defaultValue: '',
      prependIcon: <FiUser />,
    },
    {
      id: 'password',
      name: 'password',
      label: 'Mật khẩu',
      rules: {
        required: 'Nhập thông tin',
      },
      className: 'mb-4',
      classNameInput: `py-4 pl-16 bg-transparent rounded-xl w-full border border-primaryYellow focus:outline-none ${
        errors?.['password']?.message ? '!border-red-400' : ''
      }`,
      placeholder: 'Mật khẩu',
      type: showPassword ? 'text' : 'password',
      defaultValue: '',
      prependIcon: showPassword ? <FiUnlock /> : <FiLock />,
      appendIcon: (
        <div
          onClick={() => {
            setShowPassword(!showPassword)
          }}
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </div>
      ),
    },
  ]

  const onHandleSubmit = async (data) => {
    try {
      const res = await usersApi.login(data)
      ADMIN_TOKEN.set(res?.token)
      showToastSuccess(
        'Đăng nhập thành công',
        <>
          Xin chào <span className="capitalize">{res.fullName}</span>
        </>,
      )
      router.push('/admin')
    } catch (error) {
      console.error(error)
      showToastError(
        'Lỗi',
        error?.response?.status === 422 || error?.response?.status === 403
          ? 'Vui lòng kiểm tra lại tên đăng nhập hoặc mật khẩu'
          : 'Đăng nhập thất bại',
      )
    }
  }

  return (
    <ContainerLayout>
      <Container>
        <StarFall />
        <div className="flex h-screen items-center justify-center">
          <form autoComplete="off" onSubmit={handleSubmit(onHandleSubmit)}>
            <div className="animate-fade-in rounded-lg bg-black1 p-5">
              <h1 className="mb-5 text-center text-xl font-bold">Đăng nhập</h1>
              {FORM_INPUT.map((item, index) => (
                <div key={`register-input-${index}`} className={`${item.className} relative `}>
                  <div className="absolute top-0 left-6 py-4 text-2xl">{item?.prependIcon}</div>
                  <div className="absolute top-0 right-6 py-4 text-2xl">{item?.appendIcon}</div>
                  <div className={item.className}>
                    <Controller
                      control={control}
                      rules={item.rules}
                      render={({ field: { onChange, onBlur, value } }) =>
                        item.id === 'password' || item.id === 're-password' || item.id === 'phone' ? (
                          <input
                            id={item.id}
                            onBlur={onBlur}
                            value={value}
                            onChange={(e) => {
                              onChange(e.target.value.trim())
                            }}
                            className={item.classNameInput}
                            placeholder={item.placeholder}
                            type={item.type}
                            disabled={item?.disabled}
                          />
                        ) : (
                          <input
                            id={item.id}
                            onBlur={onBlur}
                            value={value}
                            onChange={onChange}
                            className={item.classNameInput}
                            placeholder={item.placeholder}
                            type={item.type || 'text'}
                            min={0}
                            disabled={item?.disabled}
                          />
                        )
                      }
                      name={item.name}
                      autoComplete="off"
                      defaultValue={item.defaultValue}
                    />
                    <p className="h-[16px] text-xs text-red-400">
                      {errors?.[item.name]?.message && `* ${errors?.[item.name]?.message || 'Invalid'}`}
                    </p>
                  </div>
                </div>
              ))}
              <Button
                size="lg"
                className="w-full"
                type="submit"
                disabled={Object.keys(errors).length > 0 || isSubmitting}
                isLoading={isSubmitting}
              >
                Đăng nhập
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </ContainerLayout>
  )
}

export default Login
