type Options = {
  characterSet: string
  step: number
  speed: number
  trailingUndescore: boolean
  trailingUndescoreSpeed: number
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const getRandomChars = (count, set) => {
  let result = ''
  set[Math.floor(Math.random() * set.length)]
  for (let index = 0; index < count; index++) {
    result += set[Math.floor(Math.random() * set.length)]
  }
  return result
}

export const glitchText = (
  targetText: string,
  callback: (result: string) => void,
  defaultOptions = {} ) => {
 
  const options = {
    characterSet: "!@#$%^&*()-=+",
    step: 4,
    speed: 120,
    trailingUndescore: false,
    trailingUndescoreSpeed: 500,
    withGlitch: true,
    ...defaultOptions
  }

  for (let index = 0; index <= targetText.length; index++) {
    setTimeout(() => {
      if (index === 0) {
        callback(targetText[0])
      } else if (index === targetText.length) {
        callback(targetText)
      } else {
        callback(targetText.slice(0, index) + getRandomChars(targetText.length - index < options.step ? targetText.length - index : options.step, options.characterSet))
      }
    }, options.speed * index)
  }

  if (options.trailingUndescore) {
    let currentTargetText = targetText
    callback(currentTargetText += '_')

    setInterval(() => {
      if (currentTargetText === targetText) {
        currentTargetText += '_'
      } else {
        currentTargetText = targetText
      }
      callback(currentTargetText)
    }, options.trailingUndescoreSpeed)
  } else if (options.withGlitch) {
    setInterval(() => {
      let currentTargetText = targetText.split('')
      currentTargetText[Math.floor(Math.random() * currentTargetText.length)] = getRandomChars(1, options.characterSet)
      callback(currentTargetText.join(''))
      setTimeout(() => {
        callback(targetText)
      }, 200)
    }, randomIntFromInterval(1000, 1500))
  }
}