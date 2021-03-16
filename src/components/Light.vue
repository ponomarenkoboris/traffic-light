<template>
    <section class="layout">
        <div class="light-wrapepr">
            <div ref="light" id="light"></div>
            <div class="timer">
                <strong>Цвет поменяется через: {{ timer }}</strong>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'Light',
    data: () => ({
        timer: 0,
    }),
    created() {
        // если стриница была перезагруженна, то записать последнее значение таймера
        if (sessionStorage.getItem('currColor') === this.$route.name) this.timer = +sessionStorage.getItem('lastTime');
    },
    mounted() {
        this.$refs.light.style.background = this.$route.name
        this.timerFunc();
    },
    methods: {
        timerFunc() {
            let nextLight = '';

            // setup next light
            if (this.$route.name === 'red' || this.$route.name === 'green') {
                nextLight = 'yellow';
                sessionStorage.clear()
                sessionStorage.setItem('was', this.$route.name === 'red' ? 'green' : 'red');
            } else {
                nextLight = sessionStorage.getItem('was');
            }

            // setup timer, if timer is empty
            if (!this.timer) {
                this.timer = this.$route.name === 'red' ? 10 : this.$route.name === 'yellow' ? 3 : 15;
                sessionStorage.setItem('currColor', this.$route.name);
            }
        
            // setup change route logic
            const timeout = setInterval(() => {
                this.timer -= 1;
                sessionStorage.setItem('lastTime', this.timer);
                if (this.timer === 0) {
                    clearInterval(timeout);
                    this.$router.replace({ path: `/${nextLight}` });
                };
            }, 1000);

            // setup flicker
            const flicker = setInterval(() => {
                if (this.timer === 0) {
                    clearInterval(flicker);
                }
                if (this.timer <= 3 && this.timer > 0) {
                    this.$refs.light.style.background = this.$refs.light.style.background === this.$route.name ? 'white' : this.$route.name;
                }
            }, 500);
        }
    }
}
</script>

<style lang="scss" scoped>
.layout {
    display: flex;
    align-items: center;
    justify-content: space-around;

    .light-wrapepr {
        margin-top: 50px;
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
        
        width: 700px;
        
        #light {
            margin-top: 30px;
            width: 400px;
            height: 400px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: space-around;
            font-size: 40px;
        }
        .timer {
            font-size: 20px;
        }
    }

    
}
</style>