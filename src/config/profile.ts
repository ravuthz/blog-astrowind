import { getAsset } from "~/utils/permalinks";
import type { LabelValue, Link } from "~/types";

export type WorkInfoype = {
  date: string[];
  company: string;
  position: string;
  children: string[];
  description: string;
};

export const fetchProfileData = async () => {
  const data = await fetch(import.meta.env.SECRET_PROFILE_URL).then((r) => r.json());
  const { socialMedia, personInfo, aboutMe, workSkills, workExperiences, educationBackground } = data;

  const findMe = {
    text: 'Fine Me',
    href: socialMedia.facebook,
  };

  const hireMe = {
    variant: 'primary',
    text: 'Hire Me',
    href: socialMedia.linkedin,
  };

  const aboutSocials = Object.entries(socialMedia).map(([key, value]) => {
    return {
      icon: `tabler:brand-${key}`,
      name: key,
      href: value,
      callToAction: {
        target: '_blank',
        text: key.toUpperCase(),
        href: value,
      },
    };
  });

  const socialLinks = aboutSocials.map(({name, icon, href}) => ({
    ariaLabel: name, icon, href
  })) as Link[];

  if (import.meta.env.SECRET_SHOW_FEED == 'true') {
    socialLinks.push({
      ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml'), 
    });
    // socialLinks.push(
    //   { 
        // icon: 'tabler:rss', name: 'RSS', href: getAsset('/rss.xml'), 
    //     callToAction: { target: '_blank', text: 'RSS', href: getAsset('/rss.xml') }
    //   });
  }

  const experiences = workExperiences.map((work: WorkInfoype) => {
    const { company, position, description, children, date } = work;
    return {
      icon: 'tabler:briefcase',
      title: `${position} <br /> <span class="font-normal">${company}</span> <br /> <span class="text-sm font-normal">${date.join(' - ')}</span>`,
      description: description + '<br/> ' + children.join('<br/>'),
    };
  });

  const educations = educationBackground.map(({ label, value }: LabelValue) => {
    const [place, subject] = value.split(' at ');
    return {
      icon: 'tabler:school',
      title: `${place} <br /> <span class="font-normal">${subject}</span> <br /> <span class="text-sm font-normal">${label}</span>`,
    };
  });

  const skills = workSkills.map(({ label, value }: LabelValue) => {
    return {
      title: label,
      description: value,
    };
  });

  const personal = {
    fullName: personInfo.firstName + ' ' + personInfo.lastName,
    ...personInfo, 
    ...socialMedia
  };

  return {
    findMe,
    hireMe,
    aboutMe,
    aboutSocials,
    skills,
    educations,
    experiences,
    personal,
    socialMedia,
    socialLinks
  };
}




