<template>
  <div></div>
</template>

<style scoped>
  div {
    width: 100%;
    height: 0.5px;
    position: relative;
    overflow: hidden;
    background-color: #52525B;
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
    background-color: #6aa3ab;
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
