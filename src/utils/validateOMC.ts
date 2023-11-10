function validateOMC(omc) {
  const sixteenDigitsRegExp = /^\d{16}$/;
  return sixteenDigitsRegExp.test(omc)
}

export { validateOMC }
