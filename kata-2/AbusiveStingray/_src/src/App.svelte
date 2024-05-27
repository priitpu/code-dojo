<script lang="ts">
  import Thread from './lib/Thread.svelte';
  import type { IPost } from './lib/interfaces/post.interface';

  const posts: IPost[] = [
    {
      id: 1,
      time: '10hr ago',
      author: {
        name: 'Elongated Muskrat',
        picture: 'https://placehold.co/100x100',
      },
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolroe magna aliqua.

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequeat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      children: [
        {
          id: 2,
          time: '10hr ago',
          author: {
            name: 'Odourless Octopus',
            picture: 'https://placehold.co/100x100',
          },
          text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequeat.',
          children: [
            {
              id: 3,
              time: '10hr ago',
              author: {
                name: 'Happy Horse',
                picture: 'https://placehold.co/100x100',
              },
              text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            },
            {
              id: 4,
              time: '10hr ago',
              author: {
                name: 'Greasy Goose',
                picture: 'https://placehold.co/100x100',
              },
              text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolroe magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.`,
            },
          ],
        },
        {
          id: 5,
          time: '10hr ago',
          author: {
            name: 'Macabre Mosquito',
            picture: 'https://placehold.co/100x100',
          },
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolroe magna aliqua.',
        },
        {
          id: 6,
          time: '10hr ago',
          author: {
            name: 'Dashing Dachshund',
            picture: 'https://placehold.co/100x100',
          },
          text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolroe magna aliqua.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        },
      ],
    },
    {
      id: 7,
      time: '10hr ago',
      author: {
        name: 'Macabre Mosquito',
        picture: 'https://placehold.co/100x100',
      },
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolroe magna aliqua.',
      children: [
        {
          id: 8,
          time: '10hr ago',
          author: {
            name: 'Dashing Dachshund',
            picture: 'https://placehold.co/100x100',
          },
          text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolroe magna aliqua.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        },
      ],
    },
  ];
</script>

<main>
  <div class="container">
    <Thread {posts} />
  </div>
</main>
