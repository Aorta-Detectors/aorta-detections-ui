function validPassword(password): boolean {
  let containsSpecialPattern = new RegExp(/[#?!@$%^&*-]/)
  let containsNumberPattern = new RegExp(/[0-9]/)
  let containsSpacePattern = new RegExp(/^\S*$/)
  return (
    containsSpecialPattern.test(password) &&
    containsSpacePattern.test(password) &&
    containsNumberPattern.test(password)
  )
}

export { validPassword }
