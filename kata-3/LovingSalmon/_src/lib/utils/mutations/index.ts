import { CROP_MUTATIONS } from "@/constants/cropMutations";

export const getRandomCropMutation = () =>
  CROP_MUTATIONS[Math.floor(Math.random() * CROP_MUTATIONS.length)];

export const getRandomUniqueMutations = (count: number): any[] => {
  const uniqueMutations: any[] = [];

  while (uniqueMutations.length < count) {
    const randomMutation = getRandomCropMutation();

    const sameMutation = uniqueMutations.some(
      (mutation) => mutation.name === randomMutation.name
    );

    if (!sameMutation) {
      uniqueMutations.push(randomMutation);
    }
  }

  return uniqueMutations;
};
