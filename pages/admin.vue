<template>
  <div>
    Page for admins only
  </div>
</template>

<script>
export default {
  middleware: ['admin_only']
}
</script>
