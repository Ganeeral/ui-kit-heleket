import { IconName } from "../icon";
import { SPRITES_META, SpritesMap } from "../icon.types";

export const getIconMeta = <Key extends keyof SpritesMap>(
  name: IconName<Key>
) => {
  const [spriteName, iconName] = name.split("/") as [Key, SpritesMap[Key]];

  const { filePath, items } = SPRITES_META[spriteName];

  const defaultSize = {
    height: 24,
    width: 24,
  };

  const viewBox = items[iconName]?.viewBox || "";

  return { defaultSize, filePath, iconName, viewBox };
};
