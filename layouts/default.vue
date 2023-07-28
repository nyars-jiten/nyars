<template>
  <div>
    <PageHeader />
    <section class="container mx-auto my-20 flex max-w-4xl flex-col gap-10 md:leading-relaxed">
      <SearchInput />
      <slot />
    </section>
  </div>
</template>
