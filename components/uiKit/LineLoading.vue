<template>
  <div class="h-[1px] bg-ns-gray-100 before:bg-ns-500 dark:h-[0.5px] dark:bg-ns-gray-700">
  </div>
</template>

<style scoped>
  div {
    width: 100%;
    position: relative;
    overflow: hidden;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
  }

  div:before {
    content: "";
    position: absolute;
    left: -50%;
    height: 3px;
    width: 40%;
    -webkit-animation: lineAnim 1.5s linear infinite;
    -moz-animation: lineAnim 1.5s linear infinite;
    animation: lineAnim 1.5s linear infinite;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
  }

  @keyframes lineAnim {
    0% {
      left: -40%;
    }
    50% {
      left: 60%;
      width: 40%;
    }
    100% {
      left: 100%;
      width: 100%;
    }
  }
</style>
