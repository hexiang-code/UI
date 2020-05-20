<template>
    <div v-if="isReady" class="window-utils" 
        :class="{ 'window-utils_open': isShowWindow, 'window-utils_closed': !isShowWindow }"
        :style="windowSizeText">
        <slot name="windowTitle">
            <div class="window-title" v-if="!$slots.windowTitle">{{title}}</div>
        </slot>
        <slot></slot>
        <slot name="windowFoot">
            <div class="window-foot" v-if="!$slots.windowFoot">
                <button @click="comfirm">confirm</button>
                <button @click="cancel">cancel</button>
            </div>
        </slot>
    </div>
</template>
<script>
export default {
    name: 'windowUtils',
    props: {
        isShowWindow: Boolean,
        width: { // 窗口宽度
            type: String,
            default: '30%'
        },
        height: { // 窗口高度
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: '提示'
        },

        top: { // 窗口距离顶部的高度
            type: String,
            default: ''
        }
    },

    computed: {
        windowSizeText () {
            return `width: ${this.width};${this.height ? 'height: '+ this.height : ''};${this.top ? 'top: '+ this.top : ''}`
        },

        isReady () {
            return this.isShowWindow
        }
    },

    methods: {
        comfirm () {
            this.$emit('update:isShowWindow', false)
            this.$emit('confirm')
        },

        // 点击取消事件
        cancel () {
            this.$emit('update:isShowWindow', false)
        }
    }
}
</script>
<style scoped lang="scss">
    .window-title {
        height: 40px;
        font-size: 20px;
        color: #1296db;
    }
    
    .window-utils {
        visibility: hidden;
        position: fixed;
        left: 0;
        right: 0;
        top: 30%;
        padding: 20px;
        margin: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        backdrop-filter: blur(10px) brightness(110%);
        z-index: 1;
        // transform: translateY(-100%);
    }

    .window-utils_open {
        visibility: visible;
        animation: open-animation 1s ease-out forwards;

        @keyframes open-animation {
            0% {
                opacity: 0;
                transform: translateY(-100%)
            }

            30% {
                opacity: 0.5;
                transform: translateY(-60%)
            }

            50% {
                opacity: 1;
                transform: translateY(0)  
            }

            70% {
                opacity: 1;
                transform: translateY(-15%)  
            }
            
            100% {
                opacity: 1;
                transform: translateY(0)
            }
        }
    }

    .window-utils_closed {
        visibility: visible;
        animation: close-animation 0.5s ease-in forwards; 
        
        @keyframes close-animation {
            0% {
                transform: translateY(0);
                opacity: 1;
            }

            100% {
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
            }
        }
    }

    .window-foot {
        width: 100%;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .window-foot button {
        position: relative;
        padding: 0;
        margin: 0;
        width: 100px;
        height: 40px;
        background-color: none;
        text-transform: uppercase;
        border: 4px solid #1296db;
        background-color: transparent;
        color: #ffffff;
        cursor: pointer;
    }
    
    .window-foot button:nth-child(1) {
        margin-right: 60px;
        color: #1296db;
    }

    .window-foot button::after, .window-foot button::before {
        content: '';
        position: absolute;
        width: 10px;
        height: 4px;
        background-color: #fff;
    }

    .window-foot button::after {
        top: 32px;
        right: 10px;
    }

    .window-foot button::before {
        top: -4px;
    }
    
    .window-foot button:hover::before {
        animation: translateBefore 1s forwards;
    }

    .window-foot button:hover::after {
        animation: translateAfter 1s forwards;
    }

    @keyframes translateBefore {
        0% {
            left: 0px;
        }

        100% {
            left: 80px;
            background-color: #1296db;
        }
    }

    @keyframes translateAfter {
        0% {
            right: 10px;
        }

        100% {
            right: 80px;
            background-color: #1296db;
        }
    }
</style>