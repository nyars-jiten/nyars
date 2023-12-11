<template>
  <div>
    <Header />
    <section class="container mx-auto my-20 flex max-w-4xl flex-col gap-10 md:leading-relaxed">
      <SearchInput />
      <slot></slot>
    </section>
  </div>
</template>
