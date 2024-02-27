import {
  Cactus,
  Detective,
  FlyingSaucer,
  Ghost,
  HandHeart,
  Heartbeat,
  HourglassMedium,
  Jeep,
  Knife,
  MagicWand,
  MaskSad,
  Mountains,
  Pen,
  PersonSimpleRun,
  PianoKeys,
  SmileyWink,
  Television,
  UsersThree,
  VideoCamera,
} from "@phosphor-icons/react";

const genreIcons: {
  [key: number]: JSX.Element;
} = {
  // Adventure
  12: <Mountains size={24} weight="duotone" />,
  // Action
  28: <PersonSimpleRun size={24} weight="duotone" />,
  // Animation
  16: <Pen size={24} weight="duotone" />,
  // Documentary
  99: <VideoCamera size={24} weight="duotone" />,
  // Drama
  18: <MaskSad size={24} weight="duotone" />,
  // Family
  10751: <UsersThree size={24} weight="duotone" />,
  // Fantasy
  14: <MagicWand size={24} weight="duotone" />,
  // History
  36: <HourglassMedium size={24} weight="duotone" />,
  // Horror
  27: <Ghost size={24} weight="duotone" />,
  // Comedy
  35: <SmileyWink size={24} weight="duotone" />,
  // War
  10752: <Jeep size={24} weight="duotone" />,
  // Krimi
  80: <Knife size={24} weight="duotone" />,
  // Romance
  10749: <HandHeart size={24} weight="duotone" />,
  // Music
  10402: <PianoKeys size={24} weight="duotone" />,
  // Mystery
  9648: <Detective size={24} weight="duotone" />,
  // Sci-Fi
  878: <FlyingSaucer size={24} weight="duotone" />,
  // Thriller
  53: <Heartbeat size={24} weight="duotone" />,
  // TV-Film
  10770: <Television size={24} weight="duotone" />,
  // Western
  37: <Cactus size={24} weight="duotone" />,
};

export default genreIcons;
