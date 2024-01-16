/**
 * todo 通用倒计时方法
 */
const CountDown = function (count = 60) {
  let countDown = null
  let countDownIn = null
  let countNew = count
  return {
    start(resolve, reject) {
      if (countDown) return
      let _this = this
      countDown = setTimeout(function cb() {
        if (countNew < 1) {
          _this.stop(reject)
          return
        }
        countNew--
        typeof resolve === 'function' && resolve(countNew)
        countDownIn = setTimeout(cb, 1000)
      }, 1000)
    },
    stop(reject) {
      clearTimeout(countDown)
      clearTimeout(countDownIn)
      countDown = null
      countDownIn = null
      countNew = count
      typeof reject === 'function' && reject()
    }
  }
}

export default CountDown
