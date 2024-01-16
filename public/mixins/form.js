import ConsultImmediately from '@/ConsultImmediately.vue'

export const serverForm = {
  components: {
    ConsultImmediately
  },
  data() {
    return {
      consultImmediately: {
        show: false,
        info: {},
        data: {}
      }
    }
  },
  methods: {
    question() {
      Object.assign(this.consultImmediately, {
        show: true,
        info: {
          width: '30%'
        }
      })
    }
  }
}
