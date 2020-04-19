// uma factor retorna um novo objeto
module.exports = () => {

    return {
        value: 1,
        inc() {
            this.value++
        }
    }
}