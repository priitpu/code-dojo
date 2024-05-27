<script lang="ts">
  export let icon: string | undefined = '';
</script>

<button class="button" type="button">
  {#if icon}<span class="icon icon-{icon}" aria-hidden="true"></span>{/if}
  <span><slot /></span>
</button>

<style lang="scss">
  .button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0;
    font-family: inherit;
    background-color: transparent;
    cursor: pointer;
    transition: border-color 0.25s;
    text-transform: uppercase;
    font-weight: 400;
    font-size: 0.8125rem;

    &:focus,
    &:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }
  }
</style>
