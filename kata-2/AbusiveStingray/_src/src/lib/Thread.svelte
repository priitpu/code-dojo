<script lang="ts">
  import Post from './Post.svelte';
  import type { IPost } from './interfaces/post.interface';
  export let posts: IPost[] = [];
</script>

<div class="thread">
  {#each posts as post}
    <Post {post} />
  {/each}
</div>
