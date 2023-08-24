export const handlePadding = (value: number) => {
  return {
    paddingLeft: value,
    paddingRight: value,
    paddingBottom: value,
    paddingTop: value,
  }
}

export const handleMargin = (value: number) => {
  return {
    marginLeft: value,
    marginRight: value,
    marginBottom: value,
    marginTop: value,
  }
}

export const handleSquare = (value: number) => {
  return {
    width: value,
    height: value,
  }
}

export const handleRound = (value: number) => {
  return {
    width: value,
    height: value,
    borderRadius: value / 2,
  }
}
