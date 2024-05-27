<script lang="ts">
  import Button from './Button.svelte';
  import type { IPost } from './interfaces/post.interface';

  export let parentId: number | undefined = undefined;
  export let post: IPost | undefined = undefined;
</script>

<div
  class="post{parentId ? ' post--parented' : ''}{post?.children?.length
    ? ' post--threaded'
    : ''}"
>
  <div class="post-aside" aria-hidden="true">
    <div class="post-line"></div>
    <div class="post-aside-picture">
      <img src={post?.author.picture} alt="" />
    </div>
  </div>

  <div class="post-body">
    <div class="post-head">
      <span class="post-head-name">{post?.author.name}</span>
      <span class="post-head-time">{post?.time}</span>
    </div>

    <div class="post-body-inner">{post?.text}</div>

    <div class="post-buttons">
      <Button icon="reply">Reply</Button>
      <Button icon="share">Share</Button>
    </div>
  </div>

  {#if post?.children?.length}
    <div class="post-corner" aria-hidden="true">
      <div class="post-line"></div>
      <div class="post-line-curve"></div>
    </div>

    <div class="post-thread">
      {#each post.children as child}
        <svelte:self parentId={post.id} post={child} />
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
  .post {
    // There is a lot of CSS variables and calculations here which in a real application
    // would be useless and static. But I really love playing around with very custom very dynamic layouts,
    // so please excuse me.

    // Design variables
    --sidebar-width: 3.625rem;
    --sidebar-padding: 1rem;
    --picture-size: 1.625rem;
    --line-width: 2px;
    --header-height: 1.5rem;
    // Calculated variables
    --half-picture-size: calc(var(--picture-size) / 2);
    --half-sidebar-width: calc(var(--sidebar-width) / 2);
    --half-line-width: calc(var(--line-width) / 2);
    --half-header-height: calc(var(--header-height) / 2);
    // Centered line position
    --line-offset: calc(50% - var(--half-line-width));
    --curve-radius: var(--half-sidebar-width);
    // rest of the goddamn ugly css lol
    display: grid;
    justify-content: start;
    grid-template-columns: var(--sidebar-width) 1fr;

    // I don't really like psuedo elements, should I care about bundle size in 2024? :D
    &-line {
      position: absolute;
      display: none;
      height: 100%;
      width: var(--line-width);
      background: #969696;
      left: var(--line-offset);
      // Account for padding, move the start to half picture height, and additional offset for the line width.
      top: calc(var(--sidebar-padding) + var(--half-picture-size));

      &-curve {
        position: absolute;
        display: none;
        // Line it up with the picture no matter how big it is
        top: calc(
          var(--sidebar-padding) - var(--half-picture-size) +
            var(--half-line-width)
        );
        left: var(--line-offset);
        width: var(--sidebar-width);
        height: var(--picture-size);
        border-bottom-left-radius: var(--curve-radius);
        background: transparent;
        border-width: 0 0 var(--line-width) var(--line-width);
        border-style: solid;
        border-color: #969696;
      }
    }

    &-aside,
    &-corner {
      position: relative;
      padding: var(--sidebar-padding);
      width: var(--sidebar-width);
    }

    &-aside-picture {
      width: var(--picture-size);
      height: var(--picture-size);
      margin: 0 auto;
      position: relative;
      overflow: hidden;
      border-radius: 100%;

      & > img {
        width: 100%;
        width: 100%;
        object-fit: cover;
      }
    }

    &-body {
      text-align: left;
      margin: var(--sidebar-padding) 0;
    }

    // There is a post after a post, show both lines (long line) on the former
    &:has(+ .post) {
      & > .post-aside .post-line {
        display: block;
      }
      & > .post-corner .post-line {
        display: block;
      }
    }

    // Thread, show short line and curved line
    &--threaded > {
      .post-aside .post-line {
        display: block;
      }

      .post-corner .post-line-curve {
        display: block;
      }
    }

    // Has a thread, but it does not have a sibling post,
    // Shorten the short line to meet up with the curved line.
    &--threaded:not(:has(+ .post)) > .post-aside .post-line {
      height: calc(100% - var(--picture-size) + var(--line-width));
    }

    &-head {
      display: flex;
      align-items: center;
      gap: 0.625rem;
      height: var(--header-height);
      // Make it look centered no matter how big the picture is
      margin-top: calc(var(--half-picture-size) - var(--half-header-height));

      &-name {
        font-weight: 700;
        color: #ffffff;
        font-size: 0.875rem;
      }

      &-time {
        font-weight: 700;
        font-size: 0.625rem;
        opacity: 0.6;
      }
    }

    &-body {
      &-inner {
        padding: 0.5rem 0;
        opacity: 0.76;
        white-space: pre-wrap;
        line-height: 1.15rem;
      }
    }

    &-buttons {
      display: flex;
      gap: 0.625rem;
      height: var(--header-height);
    }

    @media all and (max-width: 720px) {
      --sidebar-width: 2rem;
      --sidebar-padding: 0.15rem;
      --picture-size: 1.25rem;
      --line-width: 2px;
      --header-height: 1.25rem;
    }
  }
</style>
