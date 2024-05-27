import { ThreadComment } from "./models";

const happyHorse: ThreadComment = {
  id: 'happyHorse',
  parentId: 'odourlessOctopus',
  user: 'Happy Horse',
  content:
  `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
}

const greasyGoose: ThreadComment = {
  id: 'greasyGoose',
  parentId: 'odourlessOctopus',
  user: 'Greasy Goose',
  content:
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolroe magna aliqua.\n
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.`
}

const odourlessOctopus: ThreadComment = {
  id: 'odourlessOctopus',
  parentId: 'elongatedMuskrat',
  user: 'Odourless Octopus',
  content:
  `Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequeat.`,
  replies: [happyHorse, greasyGoose]
}

const macabreMosquito: ThreadComment = {
  id: 'macabreMosquito',
  parentId: 'elongatedMuskrat',
  user: 'Macabre Mosquito',
  content:
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolroe magna aliqua.`
}

const dashingDachshund: ThreadComment = {
  id: 'dashingDachshund',
  parentId: 'elongatedMuskrat',
  user: 'Dashing Dachshund',
  content:
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolroe magna aliqua.\n
  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
}

const elongatedMuskrat: ThreadComment = {
  id: 'elongatedMuskrat',
  user: 'Elongated Muskrat',
  content: 
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolroe magna aliqua.\n
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequeat.\n
  Duis auto irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  replies: [odourlessOctopus, macabreMosquito, dashingDachshund]
}

export const data: ThreadComment[] = [
  elongatedMuskrat
]