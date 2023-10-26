import { debounce } from 'lodash'

export const useValidateInput = () => {
  return {
    validateEmail: (email: string): boolean => {
      const pattern =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      return pattern.test(email)
    },
    validatePassword: (password: string): boolean => {
      const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
      return pattern.test(password)
    },
    validateConfirmPassword: (
      confirmPassword: string,
      password: string,
    ): boolean => {
      return (
        password === confirmPassword &&
        useValidateInput().validatePassword(confirmPassword)
      )
    },
    validateFullName: (fullName: string): boolean => {
      const pattern =
          /^([a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+){2,}$/
      return pattern.test(fullName)
    },
    checkError: debounce(
      (
        isCheck: boolean,
        onCheck: () => void,
      ) => {
        if (!isCheck)
          if (onCheck) {
            onCheck()
          }
      },
      100,
    ),
  }
}
