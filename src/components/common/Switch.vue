<template>
  <div class="switch flex-center">
    <label>
      <input type="checkbox" :checked="value" v-on:change="updateValue(!value)"/>
      <span></span>
    </label>
  </div>
</template>

<script setup>
import { defineProps, useContext } from "vue"

const context = useContext()
const props = defineProps({
  value: Boolean,
})

const updateValue = (beforeValue) => {
  context.emit("update:value", beforeValue)
}
</script>

<style lang="less" scoped>
.switch {
  width: 55px;
  height: 50px;

  --button-width: 100px;
  --button-height: 59px;
  --toggle-diameter: 51px;
  --button-toggle-offset: calc(
    (var(--button-height) - var(--toggle-diameter)) / 2
  );
  --toggle-shadow-offset: 2px;
  --toggle-wider: 66px;
  --color-grey: #e9e9e9;
  --color-dark-grey: #39393d;

  label {
    height: 50px;
    display: flex;
    align-items: center;

    span {
      display: inline-block;
      width: var(--button-width);
      height: var(--button-height);
      background-color: var(--color-grey);
      border-radius: calc(var(--button-height) / 2);
      position: relative;
      transition: 0.3s all ease-in-out;
      transform: scale(0.4);
      cursor: pointer;

      &::after {
        content: "";
        display: inline-block;
        width: var(--toggle-diameter);
        height: var(--toggle-diameter);
        background-color: #fff;
        border-radius: calc(var(--toggle-diameter) / 2);
        position: absolute;
        top: var(--button-toggle-offset);
        transform: translateX(var(--button-toggle-offset));
        box-shadow: var(--toggle-shadow-offset) 0
          calc(var(--toggle-shadow-offset) * 4) rgba(0, 0, 0, 0.1);
        transition: 0.3s all ease-in-out;
      }
    }

    input[type="checkbox"]:checked + span {
      background-color: var(--theme-color);
    }

    input[type="checkbox"]:checked + span::after {
      transform: translateX(
        calc(
          var(--button-width) - var(--toggle-diameter) -
            var(--button-toggle-offset)
        )
      );
      box-shadow: calc(var(--toggle-shadow-offset) * -1) 0
        calc(var(--toggle-shadow-offset) * 4) rgba(0, 0, 0, 0.1);
    }

    input[type="checkbox"] {
      display: none;
    }

    input[type="checkbox"]:active + span::after {
      width: var(--toggle-wider);
    }

    input[type="checkbox"]:checked:active + span::after {
      transform: translateX(
        calc(
          var(--button-width) - var(--toggle-wider) -
            var(--button-toggle-offset)
        )
      );
    }
  }
}
</style>
