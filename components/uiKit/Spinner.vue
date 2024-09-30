<template>
  <div />
</template>

<style scoped>
div {
   width: 24px;
   height: 24px;
   display: grid;
   animation: spinner 4.8s infinite;
}

div::before,
div::after {
   content: "";
   grid-area: 1/1;
   border: 3.8px solid;
   border-radius: 50%;
   border-color: #6aa3ab #6aa3ab #0000 #0000;
   mix-blend-mode: darken;
   animation: spinner 1.2s infinite linear;
}

div::after {
   border-color: #0000 #0000 #dbdcef #dbdcef;
   animation-direction: reverse;
}

@keyframes spinner {
   100% {
      transform: rotate(1turn);
   }
}
</style>
